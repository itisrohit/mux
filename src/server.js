const { Hono } = require('hono');
const { serve } = require('@hono/node-server');
const { streamText } = require('hono/streaming');
const { chatCompletion } = require('./puter.js');
const { getModelId, getAllModels, getModelsByCategory, getCategories } = require('./model.js');
const { getToken } = require('./config.js');

const app = new Hono();

app.get('/', (c) => c.text('Mux API is running.'));

/**
 * Chat Endpoint - Optimized concepts
 */
app.post('/chat', async (c) => {
    const body = await c.req.json();

    const query = body.query;
    const modelInput = body.model || process.env.DEFAULT_MODEL || 'gpt-4o-mini';
    const model = getModelId(modelInput);

    let messages = body.messages || [];
    if (messages.length === 0 && query) {
        messages = [{ role: 'user', content: query }];
    }

    if (messages.length === 0) {
        return c.json({ success: false, error: "Either 'query' or 'messages' is required" }, 400);
    }

    const options = body.options || {};
    const streamRequested = options.stream === true;
    const token = getToken() || c.req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return c.json({ success: false, error: "PUTER_TOKEN not found." }, 401);
    }

    try {
        const result = await chatCompletion({
            model,
            messages,
            stream: streamRequested,
            token,
            testMode: body.testMode,
            media: body.imageUrls || (body.imageUrl ? [body.imageUrl] : null),
            options
        });

        if (streamRequested) {
            return streamText(c, async (stream) => {
                c.header('Content-Type', 'text/plain; charset=utf-8');
                for await (const chunk of result) {
                    if (chunk.type === 'content' || chunk.type === 'reasoning') {
                        await stream.write(chunk.content || "");
                    }
                    // Meta information like usage is logged but not written to text stream
                }
            });
        } else {
            return c.json({
                success: true,
                response: result.text,
                reasoning: result.reasoning,
                usage: result.usage,
                tool_calls: result.tool_calls,
                model: model
            });
        }
    } catch (err) {
        console.error('Chat Error:', err.message);
        return c.json({ success: false, error: err.message }, 500);
    }
});

// Model endpoints...
app.get('/api/models', (c) => {
    const allModels = getAllModels();
    return c.json({
        models: Object.keys(allModels).map(m => ({ shortName: m, fullId: Array.isArray(allModels[m]) ? allModels[m][0] : allModels[m] })),
        total: Object.keys(allModels).length
    });
});

app.get('/api/models/:category', (c) => {
    const category = c.req.param('category');
    const categoryModels = getModelsByCategory(category);
    return c.json({
        category,
        models: Object.keys(categoryModels).map(m => ({ shortName: m, fullId: Array.isArray(categoryModels[m]) ? categoryModels[m][0] : categoryModels[m] })),
        total: Object.keys(categoryModels).length
    });
});
app.get('/api/categories', (c) => {
    const categories = getCategories();
    return c.json({
        categories,
        total: categories.length
    });
});

const port = 1862;
serve({ fetch: app.fetch, port });
console.log(`🚀 Mux API Server running on port ${port}`);