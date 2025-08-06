const models = {
    // Anthropic Models
    anthropic: {
        'claude-sonnet-4': 'openrouter:anthropic/claude-sonnet-4',
        'claude-opus-4': 'openrouter:anthropic/claude-opus-4',
        'claude-3.7-sonnet': 'openrouter:anthropic/claude-3.7-sonnet',
        'claude-3.5-sonnet': 'openrouter:anthropic/claude-3.5-sonnet',
        'claude-3.5-haiku': 'openrouter:anthropic/claude-3.5-haiku',
        'claude-3-haiku': 'openrouter:anthropic/claude-3-haiku',
        'claude-3-opus': 'openrouter:anthropic/claude-3-opus'
    },

    // OpenAI Models
    openai: {
        'gpt-4o': 'openrouter:openai/gpt-4o',
        'gpt-4o-mini': 'openrouter:openai/gpt-4o-mini',
        'gpt-4o-mini-search-preview': 'openrouter:openai/gpt-4o-mini-search-preview',
        'gpt-4o-search-preview': 'openrouter:openai/gpt-4o-search-preview',
        'gpt-4.1': 'openrouter:openai/gpt-4.1',
        'gpt-4.1-mini': 'openrouter:openai/gpt-4.1-mini',
        'gpt-4.1-nano': 'openrouter:openai/gpt-4.1-nano',
        'gpt-4.5-preview': 'openrouter:openai/gpt-4.5-preview',
        'o1': 'openrouter:openai/o1',
        'o1-mini': 'openrouter:openai/o1-mini',
        'o1-pro': 'openrouter:openai/o1-pro',
        'o3': 'openrouter:openai/o3',
        'o3-mini': 'openrouter:openai/o3-mini',
        'o3-mini-high': 'openrouter:openai/o3-mini-high',
        'o4-mini': 'openrouter:openai/o4-mini',
        'o4-mini-high': 'openrouter:openai/o4-mini-high',
        'gpt-4-turbo': 'openrouter:openai/gpt-4-turbo',
        'gpt-3.5-turbo': 'openrouter:openai/gpt-3.5-turbo'
    },

    // Google Models
    google: {
        'gemini-pro-1.5': 'openrouter:google/gemini-pro-1.5',
        'gemini-2.5-pro': 'openrouter:google/gemini-2.5-pro',
        'gemini-2.5-flash': 'openrouter:google/gemini-2.5-flash',
        'gemini-2.0-flash': 'openrouter:google/gemini-2.0-flash',
        'gemini-2.0-flash-lite': 'openrouter:google/gemini-2.0-flash-lite',
        'gemini-1.5-flash': 'openrouter:google/gemini-1.5-flash',
        'gemini-flash-1.5': 'openrouter:google/gemini-flash-1.5',
        'gemma-3-27b-it': 'openrouter:google/gemma-3-27b-it',
        'gemma-3-12b-it': 'openrouter:google/gemma-3-12b-it',
        'gemma-3-4b-it': 'openrouter:google/gemma-3-4b-it',
        'gemma-2-27b-it': 'openrouter:google/gemma-2-27b-it',
        'gemma-2-9b-it': 'openrouter:google/gemma-2-9b-it'
    },

    // Mistral Models
    mistral: {
        'mistral-large': 'openrouter:mistralai/mistral-large',
        'mistral-medium': 'openrouter:mistralai/mistral-medium',
        'mistral-small': 'openrouter:mistralai/mistral-small',
        'mistral-tiny': 'openrouter:mistralai/mistral-tiny',
        'mixtral-8x7b-instruct': 'openrouter:mistralai/mixtral-8x7b-instruct',
        'mistral-7b-instruct': 'openrouter:mistralai/mistral-7b-instruct',
        'mistral-7b-instruct-v0.3': 'openrouter:mistralai/mistral-7b-instruct-v0.3',
        'mistral-7b-instruct-v0.2': 'openrouter:mistralai/mistral-7b-instruct-v0.2',
        'mistral-7b-instruct-v0.1': 'openrouter:mistralai/mistral-7b-instruct-v0.1',
        'mixtral-8x22b-instruct': 'openrouter:mistralai/mixtral-8x22b-instruct',
        'codestral-2508': 'openrouter:mistralai/codestral-2508',
        'devstral-small': 'openrouter:mistralai/devstral-small',
        'magistral-small': 'openrouter:mistralai/magistral-small',
        'magistral-medium': 'openrouter:mistralai/magistral-medium'
    },

    // Meta/Llama Models
    meta: {
        'llama-3.1-8b-instruct': 'openrouter:meta-llama/llama-3.1-8b-instruct',
        'llama-3.1-405b-instruct': 'openrouter:meta-llama/llama-3.1-405b-instruct',
        'llama-3.1-70b-instruct': 'openrouter:meta-llama/llama-3.1-70b-instruct',
        'llama-3.2-3b-instruct': 'openrouter:meta-llama/llama-3.2-3b-instruct',
        'llama-3.2-90b-vision-instruct': 'openrouter:meta-llama/llama-3.2-90b-vision-instruct',
        'llama-3.2-11b-vision-instruct': 'openrouter:meta-llama/llama-3.2-11b-vision-instruct',
        'llama-3-8b-instruct': 'openrouter:meta-llama/llama-3-8b-instruct',
        'llama-3-70b-instruct': 'openrouter:meta-llama/llama-3-70b-instruct',
        'llama-2-70b-hf': 'openrouter:meta-llama/llama-2-70b-hf',
        'llama-guard-2-8b': 'openrouter:meta-llama/llama-guard-2-8b',
        'llama-guard-3-8b': 'openrouter:meta-llama/llama-guard-3-8b',
        'llama-guard-4-12b': 'openrouter:meta-llama/llama-guard-4-12b'
    },

    // Qwen Models
    qwen: {
        'qwen3-235b-a22b': 'openrouter:qwen/qwen3-235b-a22b',
        'qwen3-30b-a3b': 'openrouter:qwen/qwen3-30b-a3b',
        'qwen3-8b': 'openrouter:qwen/qwen3-8b',
        'qwen3-14b': 'openrouter:qwen/qwen3-14b',
        'qwen3-32b': 'openrouter:qwen/qwen3-32b',
        'qwen3-4b': 'openrouter:qwen/qwen3-4b',
        'qwen3-coder': 'openrouter:qwen/qwen3-coder',
        'qwen2.5-72b-instruct': 'openrouter:qwen/qwen2.5-72b-instruct',
        'qwen2.5-7b-instruct': 'openrouter:qwen/qwen2.5-7b-instruct',
        'qwen2.5-vl-72b-instruct': 'openrouter:qwen/qwen2.5-vl-72b-instruct',
        'qwen2.5-vl-32b-instruct': 'openrouter:qwen/qwen2.5-vl-32b-instruct',
        'qwen2.5-coder-32b-instruct': 'openrouter:qwen/qwen2.5-coder-32b-instruct',
        'qwen2-72b-instruct': 'openrouter:qwen/qwen2-72b-instruct',
        'qwen-vl-plus': 'openrouter:qwen/qwen-vl-plus',
        'qwen-vl-max': 'openrouter:qwen/qwen-vl-max',
        'qwen-turbo': 'openrouter:qwen/qwen-turbo',
        'qwen-plus': 'openrouter:qwen/qwen-plus',
        'qwen-max': 'openrouter:qwen/qwen-max'
    },

    // DeepSeek Models
    deepseek: {
        'deepseek-r1': 'openrouter:deepseek/deepseek-r1',
        'deepseek-r1-distill-llama-70b': 'openrouter:deepseek/deepseek-r1-distill-llama-70b',
        'deepseek-r1-distill-qwen-32b': 'openrouter:deepseek/deepseek-r1-distill-qwen-32b',
        'deepseek-r1-distill-qwen-14b': 'openrouter:deepseek/deepseek-r1-distill-qwen-14b',
        'deepseek-r1-distill-qwen-1.5b': 'openrouter:deepseek/deepseek-r1-distill-qwen-1.5b',
        'deepseek-r1-distill-llama-8b': 'openrouter:deepseek/deepseek-r1-distill-llama-8b',
        'deepseek-chat': 'openrouter:deepseek/deepseek-chat',
        'deepseek-v3': 'openrouter:deepseek/deepseek-v3',
        'deepseek-v3-base': 'openrouter:deepseek/deepseek-v3-base',
        'deepseek-prover-v2': 'openrouter:deepseek/deepseek-prover-v2'
    },

    // Perplexity Models
    perplexity: {
        'sonar-pro': 'openrouter:perplexity/sonar-pro',
        'sonar-reasoning-pro': 'openrouter:perplexity/sonar-reasoning-pro',
        'sonar-deep-research': 'openrouter:perplexity/sonar-deep-research',
        'sonar-reasoning': 'openrouter:perplexity/sonar-reasoning',
        'sonar': 'openrouter:perplexity/sonar',
        'r1-1776': 'openrouter:perplexity/r1-1776'
    },

    // X.AI Models
    xai: {
        'grok-4': 'openrouter:x-ai/grok-4',
        'grok-3': 'openrouter:x-ai/grok-3',
        'grok-3-mini': 'openrouter:x-ai/grok-3-mini',
        'grok-3-beta': 'openrouter:x-ai/grok-3-beta',
        'grok-3-mini-beta': 'openrouter:x-ai/grok-3-mini-beta',
        'grok-2-vision': 'openrouter:x-ai/grok-2-vision',
        'grok-2': 'openrouter:x-ai/grok-2',
        'grok-vision-beta': 'openrouter:x-ai/grok-vision-beta'
    },

    // Cohere Models
    cohere: {
        'command': 'openrouter:cohere/command',
        'command-r': 'openrouter:cohere/command-r',
        'command-r-plus': 'openrouter:cohere/command-r-plus',
        'command-a': 'openrouter:cohere/command-a',
        'command-r7b-12-2024': 'openrouter:cohere/command-r7b-12-2024',
        'command-r-plus-08-2024': 'openrouter:cohere/command-r-plus-08-2024',
        'command-r-08-2024': 'openrouter:cohere/command-r-08-2024',
        'command-r-plus-04-2024': 'openrouter:cohere/command-r-plus-04-2024',
        'command-r-03-2024': 'openrouter:cohere/command-r-03-2024'
    },

    // Microsoft Models
    microsoft: {
        'phi-4': 'openrouter:microsoft/phi-4',
        'phi-4-reasoning-plus': 'openrouter:microsoft/phi-4-reasoning-plus',
        'phi-4-multimodal-instruct': 'openrouter:microsoft/phi-4-multimodal-instruct',
        'phi-3.5-mini-128k-instruct': 'openrouter:microsoft/phi-3.5-mini-128k-instruct',
        'phi-3-medium-128k-instruct': 'openrouter:microsoft/phi-3-medium-128k-instruct',
        'phi-3-mini-128k-instruct': 'openrouter:microsoft/phi-3-mini-128k-instruct',
        'wizardlm-2-8x22b': 'openrouter:microsoft/wizardlm-2-8x22b',
        'mai-ds-r1': 'openrouter:microsoft/mai-ds-r1'
    },

    // Other Popular Models
    others: {
        'gemini-1.5-flash': 'openrouter:google/gemini-1.5-flash',
        'gemini-2.0-flash': 'openrouter:google/gemini-2.0-flash',
        'gemini-2.0-flash-lite': 'openrouter:google/gemini-2.0-flash-lite',
        'gemini-1.5': 'openrouter:google/gemini-1.5',
        'gpt-4o': 'openrouter:openai/gpt-4o',
        'gpt-4o-mini': 'openrouter:openai/gpt-4o-mini',
        'claude-sonnet-4': 'openrouter:anthropic/claude-sonnet-4',
        'claude-opus-4': 'openrouter:anthropic/claude-opus-4',
        'mistral-large': 'openrouter:mistralai/mistral-large',
        'mistral-medium': 'openrouter:mistralai/mistral-medium',
        'mistral-small': 'openrouter:mistralai/mistral-small',
        'llama-3.1-8b-instruct': 'openrouter:meta-llama/llama-3.1-8b-instruct',
        'qwen3-235b-a22b': 'openrouter:qwen/qwen3-235b-a22b',
        'deepseek-r1': 'openrouter:deepseek/deepseek-r1',
        'sonar-pro': 'openrouter:perplexity/sonar-pro'
    }
};

// Helper functions
function getAllModels() {
    const allModels = {};
    Object.values(models).forEach(category => {
        Object.assign(allModels, category);
    });
    return allModels;
}

function getModelsByCategory(category) {
    return models[category] || {};
}

function getModelId(shortName) {
    const allModels = getAllModels();
    return allModels[shortName] || shortName;
}

function getModelInfo(modelId) {
    const allModels = getAllModels();
    for (const [shortName, fullId] of Object.entries(allModels)) {
        if (fullId === modelId) {
            return { shortName, fullId };
        }
    }
    return { shortName: modelId, fullId: modelId };
}

function getCategories() {
    return Object.keys(models);
}

module.exports = {
    models,
    getAllModels,
    getModelsByCategory,
    getModelId,
    getModelInfo,
    getCategories
};