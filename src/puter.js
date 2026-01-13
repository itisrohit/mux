const { getDriverForModel } = require('./model.js');

const PUTER_API_ENDPOINT = "https://api.puter.com/drivers/call";

/**
 * Exact replica of render_messages from helper.py
 */
function renderMessages(messages, media = null) {
    let lastIsAssistant = false;
    const rendered = [];

    for (let i = 0; i < messages.length; i++) {
        const message = { ...messages[i] };

        // Remove duplicate assistant messages
        if (message.role === "assistant") {
            if (lastIsAssistant) continue;
            lastIsAssistant = true;
        } else {
            lastIsAssistant = false;
        }

        // Render content parts
        if (Array.isArray(message.content)) {
            message.content = message.content.filter(part => part);
            rendered.push(message);
        }
        // Append media to the last message if provided
        else if (media && i === messages.length - 1) {
            const contentParts = media.map(m => {
                return {
                    type: "image_url",
                    image_url: { url: m }
                };
            });

            if (typeof message.content === 'string') {
                contentParts.push({ type: "text", text: message.content });
            } else if (Array.isArray(message.content)) {
                contentParts.push(...message.content);
            }

            rendered.push({
                ...message,
                content: contentParts
            });
        } else {
            rendered.push(message);
        }
    }
    return rendered;
}

/**
 * Enhanced SSE stream handling reasoning, usage, and tool calls (from v2.new.py)
 */
async function* sseStream(body) {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let reasoningActive = false;

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop();

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('data:')) {
                    const rest = trimmedLine.slice(5).trim();
                    if (!rest || rest === '[DONE]') continue;

                    try {
                        const result = JSON.parse(rest);
                        if (result.error) {
                            throw new Error(result.error.message || JSON.stringify(result.error));
                        }

                        const choices = result.choices || [{}];
                        const choice = choices[0] || {};
                        const delta = choice.delta || {};

                        // Handle Reasoning
                        if (delta.reasoning_content) {
                            reasoningActive = true;
                            yield { type: 'reasoning', content: delta.reasoning_content };
                        } else if (delta.content) {
                            if (reasoningActive) {
                                yield { type: 'reasoning', status: 'done' };
                                reasoningActive = false;
                            }
                            yield { type: 'content', content: delta.content };
                        }

                        if (result.usage) yield { type: 'usage', data: result.usage };
                        if (delta.tool_calls) yield { type: 'tool_calls', data: delta.tool_calls };
                        if (choice.finish_reason) yield { type: 'finish', reason: choice.finish_reason };

                    } catch (e) {
                        continue;
                    }
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}

/**
 * Main chat completion function using direct API (concept from v2.new)
 */
async function chatCompletion(params) {
    let {
        model,
        messages,
        stream = false,
        token,
        testMode = false,
        media = null,
        extraParameters = ["temperature", "presence_penalty", "top_p", "frequency_penalty", "response_format", "tools", "parallel_tool_calls", "tool_choice", "reasoning_effort", "logit_bias", "voice", "modalities", "audio"],
        options = {}
    } = params;

    // Default to gpt-4o-mini if no model provided
    if (!model) model = "gpt-4o-mini";

    // Vision Auto-detection logic from v2.new.py (lines 293-306)
    let needsVision = (media && media.length > 0);
    if (!needsVision) {
        for (const msg of messages) {
            if (msg.role === 'user' && Array.isArray(msg.content)) {
                if (msg.content.some(item => item.type === 'image_url')) {
                    needsVision = true;
                    break;
                }
            }
        }
    }
    // Note: We'd switch to default_vision_model here if current model isn't vision capable
    // But since the user provides the model, we use it as is or default to gpt-4o.

    const driver = getDriverForModel(model);
    const renderedMessages = renderMessages(messages, media);

    // Arg filtering from v2.new
    const filteredOptions = {};
    extraParameters.forEach(param => {
        if (options[param] !== undefined) filteredOptions[param] = options[param];
    });

    const payload = {
        interface: "puter-chat-completion",
        driver: driver,
        test_mode: testMode || (messages[0] && messages[0].content === 'test'),
        method: "complete",
        args: {
            messages: renderedMessages,
            model: model,
            stream: stream,
            ...filteredOptions
        }
    };

    const headers = {
        "authorization": `Bearer ${token}`,
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        "content-type": "application/json;charset=UTF-8",
        "accept": stream ? "text/event-stream" : "*/*",
        "origin": "http://docs.puter.com",
        "sec-fetch-site": "cross-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        "referer": "http://docs.puter.com/",
        "accept-encoding": "gzip",
        "accept-language": "en-US,en;q=0.9"
    };

    const response = await fetch(PUTER_API_ENDPOINT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Puter API error: ${response.status} ${text}`);
    }

    if (stream) {
        return sseStream(response.body);
    } else {
        const result = await response.json();
        let choice = result.choices ? result.choices[0] : (result.result || {});
        let message = choice.message || choice;

        let content = "";
        if (Array.isArray(message.content)) {
            content = message.content.map(p => p.type === 'text' ? p.text : '').join('');
        } else {
            content = message.content || message.text || "";
        }

        return {
            text: content,
            reasoning: message.reasoning_content,
            usage: result.usage,
            tool_calls: message.tool_calls,
            finish_reason: choice.finish_reason
        };
    }
}

module.exports = { chatCompletion, renderMessages, sseStream };
