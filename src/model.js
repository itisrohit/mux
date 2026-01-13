const models = {
    anthropic: {
        "claude-3.7-sonnet": ["claude-3-7-sonnet-20250219", "claude-3-7-sonnet-latest", "openrouter:anthropic/claude-3.7-sonnet", "openrouter:anthropic/claude-3.7-sonnet:beta"],
        "claude-3.7-sonnet-thinking": "openrouter:anthropic/claude-3.7-sonnet:thinking",
        "claude-3.5-haiku": ["openrouter:anthropic/claude-3.5-haiku:beta", "openrouter:anthropic/claude-3.5-haiku", "openrouter:anthropic/claude-3.5-haiku-20241022:beta", "openrouter:anthropic/claude-3.5-haiku-20241022"],
        "claude-3.5-sonnet": ["claude-3-5-sonnet-20241022", "claude-3-5-sonnet-latest", "claude-3-5-sonnet-20240620", "openrouter:anthropic/claude-3.5-sonnet-20240620:beta", "openrouter:anthropic/claude-3.5-sonnet-20240620", "openrouter:anthropic/claude-3.5-sonnet:beta", "openrouter:anthropic/claude-3.5-sonnet"],
        "claude-3-haiku": ["claude-3-haiku-20240307", "openrouter:anthropic/claude-3-haiku:beta", "openrouter:anthropic/claude-3-haiku"],
        "claude-3-opus": ["openrouter:anthropic/claude-3-opus:beta", "openrouter:anthropic/claude-3-opus"],
        "claude-3-sonnet": ["openrouter:anthropic/claude-3-sonnet:beta", "openrouter:anthropic/claude-3-sonnet"],
        "claude-2.1": "openrouter:anthropic/claude-2.1",
        "claude-2": "openrouter:anthropic/claude-2",
        "claude-2.0": "openrouter:anthropic/claude-2.0",
        "claude-haiku-4.5": "openrouter:anthropic/claude-haiku-4.5",
        "claude-opus-4": "openrouter:anthropic/claude-opus-4",
        "claude-opus-4.1": "openrouter:anthropic/claude-opus-4.1",
        "claude-opus-4.5": "openrouter:anthropic/claude-opus-4.5",
        "claude-sonnet-4": "openrouter:anthropic/claude-sonnet-4",
        "claude-sonnet-4.5": "openrouter:anthropic/claude-sonnet-4.5"
    },
    openai: {
        "gpt-4o": "openrouter:openai/gpt-4o",
        "gpt-4o-mini": "openrouter:openai/gpt-4o-mini",
        "o1": "openrouter:openai/o1",
        "o1-mini": "openrouter:openai/o1-mini",
        "o1-pro": "openrouter:openai/o1-pro",
        "o3": "openrouter:openai/o3",
        "o3-mini": "openrouter:openai/o3-mini",
        "o4-mini": "openrouter:openai/o4-mini",
        "gpt-4.1": "openrouter:openai/gpt-4.1",
        "gpt-4.1-mini": "openrouter:openai/gpt-4.1-mini",
        "gpt-4.1-nano": "openrouter:openai/gpt-4.1-nano",
        "gpt-4.5-preview": "openrouter:openai/gpt-4.5-preview",
        "chatgpt-4o-latest": "openrouter:openai/chatgpt-4o-latest",
        "gpt-oss-120b": "openrouter:openai/gpt-oss-120b:free",
        "codex-mini": "openrouter:openai/codex-mini",
        "gpt-3.5-turbo": "openrouter:openai/gpt-3.5-turbo",
        "gpt-3.5-turbo-0613": "openrouter:openai/gpt-3.5-turbo-0613",
        "gpt-3.5-turbo-16k": "openrouter:openai/gpt-3.5-turbo-16k",
        "gpt-3.5-turbo-instruct": "openrouter:openai/gpt-3.5-turbo-instruct",
        "gpt-4-turbo": "openrouter:openai/gpt-4-turbo",
        "gpt-4o-audio-preview": "openrouter:openai/gpt-4o-audio-preview",
        "gpt-4o-mini-search-preview": "openrouter:openai/gpt-4o-mini-search-preview",
        "gpt-4o-search-preview": "openrouter:openai/gpt-4o-search-preview",
        "gpt-5": "openrouter:openai/gpt-5",
        "gpt-5-mini": "openrouter:openai/gpt-5-mini"
    },
    google: {
        "gemini-1.5-flash": ["gemini-1.5-flash", "openrouter:google/gemini-flash-1.5", "gemini-flash-1.5-8b"],
        "gemini-1.5-8b-flash": "openrouter:google/gemini-flash-1.5-8b",
        "gemini-1.5-pro": "openrouter:google/gemini-pro-1.5",
        "gemini-2.0-flash": ["gemini-2.0-flash", "openrouter:google/gemini-2.0-flash-lite-001", "openrouter:google/gemini-2.0-flash-001", "openrouter:google/gemini-2.0-flash-exp:free"],
        "gemini-2.5-pro": ["openrouter:google/gemini-2.5-pro-preview", "openrouter:google/gemini-2.5-pro-exp-03-25"],
        "gemini-2.5-flash": "openrouter:google/gemini-2.5-flash-preview",
        "gemini-2.5-flash-thinking": "openrouter:google/gemini-2.5-flash-preview:thinking",
        "gemma-2-9b": ["openrouter:google/gemma-2-9b-it:free", "openrouter:google/gemma-2-9b-it"],
        "gemma-2-27b": "openrouter:google/gemma-2-27b-it",
        "gemma-3-1b": "openrouter:google/gemma-3-1b-it:free",
        "gemma-3-4b": ["openrouter:google/gemma-3-4b-it:free", "openrouter:google/gemma-3-4b-it"],
        "gemma-3-12b": ["openrouter:google/gemma-3-12b-it:free", "openrouter:google/gemma-3-12b-it"],
        "gemma-3-27b": ["openrouter:google/gemma-3-27b-it:free", "openrouter:google/gemma-3-27b-it"],
        "gemini-3-flash-preview": "openrouter:google/gemini-3-flash-preview",
        "gemini-3-pro-image-preview": "openrouter:google/gemini-3-pro-image-preview",
        "gemini-3-pro-preview": "openrouter:google/gemini-3-pro-preview"
    },
    mistral: {
        "mixtral-8x22b": "openrouter:mistralai/mixtral-8x22b-instruct",
        "pixtral-large": "openrouter:mistralai/pixtral-large-2411",
        "ministral-3b": "openrouter:mistralai/ministral-3b-2512",
        "ministral-8b": "openrouter:mistralai/ministral-8b-2512",
        "mistral-large": "openrouter:mistralai/mistral-large-2512",
        "codestral": "openrouter:mistralai/codestral-2508",
        "ministral-14b": "openrouter:mistralai/ministral-14b-2512",
        "mistral-7b-instruct": "openrouter:mistralai/mistral-7b-instruct",
        "mistral-nemo": "openrouter:mistralai/mistral-nemo",
        "pixtral-12b": "openrouter:mistralai/pixtral-12b"
    },
    meta: {
        "llama-2-70b": "openrouter:meta-llama/llama-2-70b-chat",
        "llama-3-8b": "openrouter:meta-llama/llama-3-8b-instruct",
        "llama-3-70b": "openrouter:meta-llama/llama-3-70b-instruct",
        "llama-3.1-8b": ["openrouter:meta-llama/llama-3.1-8b-instruct:free", "openrouter:meta-llama/llama-3.1-8b-instruct"],
        "llama-3.1-70b": "openrouter:meta-llama/llama-3.1-70b-instruct",
        "llama-3.1-405b": ["openrouter:meta-llama/llama-3.1-405b:free", "openrouter:meta-llama/llama-3.1-405b", "openrouter:meta-llama/llama-3.1-405b-instruct"],
        "llama-3.2-1b": ["openrouter:meta-llama/llama-3.2-1b-instruct:free", "openrouter:meta-llama/llama-3.2-1b-instruct"],
        "llama-3.2-3b": ["openrouter:meta-llama/llama-3.2-3b-instruct:free", "openrouter:meta-llama/llama-3.2-3b-instruct"],
        "llama-3.2-11b": ["openrouter:meta-llama/llama-3.2-11b-vision-instruct:free", "openrouter:meta-llama/llama-3.2-11b-vision-instruct"],
        "llama-3.2-90b": "openrouter:meta-llama/llama-3.2-90b-vision-instruct",
        "llama-3.3-8b": "openrouter:meta-llama/llama-3.3-8b-instruct:free",
        "llama-3.3-70b": ["openrouter:meta-llama/llama-3.3-70b-instruct:free", "openrouter:meta-llama/llama-3.3-70b-instruct"],
        "llama-4-maverick": ["openrouter:meta-llama/llama-4-maverick:free", "openrouter:meta-llama/llama-4-maverick"],
        "llama-4-scout": ["openrouter:meta-llama/llama-4-scout:free", "openrouter:meta-llama/llama-4-scout"],
        "nemotron-49b": ["openrouter:nvidia/llama-3.3-nemotron-super-49b-v1:free", "openrouter:nvidia/llama-3.3-nemotron-super-49b-v1"],
        "nemotron-70b": "openrouter:nvidia/llama-3.1-nemotron-70b-instruct",
        "nemotron-253b": "openrouter:nvidia/llama-3.1-nemotron-ultra-253b-v1:free"
    },
    qwen: {
        "qwq-32b": ["openrouter:qwen/qwq-32b-preview", "openrouter:qwen/qwq-32b:free", "openrouter:qwen/qwq-32b"],
        "qwen-vl-plus": "openrouter:qwen/qwen-vl-plus",
        "qwen-vl-max": "openrouter:qwen/qwen-vl-max",
        "qwen-turbo": "openrouter:qwen/qwen-turbo",
        "qwen-2.5-vl-72b": ["openrouter:qwen/qwen2.5-vl-72b-instruct:free", "openrouter:qwen/qwen2.5-vl-72b-instruct"],
        "qwen-plus": "openrouter:qwen/qwen-plus",
        "qwen-max": "openrouter:qwen/qwen-max",
        "qwen-2.5-coder-32b": ["openrouter:qwen/qwen-2.5-coder-32b-instruct:free", "openrouter:qwen/qwen-2.5-coder-32b-instruct"],
        "qwen-2.5-7b": ["openrouter:qwen/qwen-2.5-7b-instruct:free", "openrouter:qwen/qwen-2.5-7b-instruct"],
        "qwen-2.5-72b": ["openrouter:qwen/qwen-2.5-72b-instruct:free", "openrouter:qwen/qwen-2.5-72b-instruct"],
        "qwen-2.5-vl-7b": ["openrouter:qwen/qwen-2.5-vl-7b-instruct:free", "openrouter:qwen/qwen-2.5-vl-7b-instruct"],
        "qwen-2-72b": "openrouter:qwen/qwen-2-72b-instruct",
        "qwen-3-0.6b": "openrouter:qwen/qwen3-0.6b-04-28:free",
        "qwen-3-1.7b": "openrouter:qwen/qwen3-1.7b:free",
        "qwen-3-4b": "openrouter:qwen/qwen3-4b:free",
        "qwen-3-30b": ["openrouter:qwen/qwen3-30b-a3b:free", "openrouter:qwen/qwen3-30b-a3b"],
        "qwen-3-8b": ["openrouter:qwen/qwen3-8b:free", "openrouter:qwen/qwen3-8b"],
        "qwen-3-14b": ["openrouter:qwen/qwen3-14b:free", "openrouter:qwen/qwen3-14b"],
        "qwen-3-32b": ["openrouter:qwen/qwen3-32b:free", "openrouter:qwen/qwen3-32b"],
        "qwen-3-235b": ["openrouter:qwen/qwen3-235b-a22b:free", "openrouter:qwen/qwen3-235b-a22b"],
        "qwen-2.5-coder-7b": "openrouter:qwen/qwen2.5-coder-7b-instruct",
        "qwen-2.5-vl-3b": "openrouter:qwen/qwen2.5-vl-3b-instruct:free",
        "qwen-2.5-vl-32b": ["openrouter:qwen/qwen2.5-vl-32b-instruct:free", "openrouter:qwen/qwen2.5-vl-32b-instruct"]
    },
    deepseek: {
        "deepseek-prover-v2": ["openrouter:deepseek/deepseek-prover-v2:free", "openrouter:deepseek/deepseek-prover-v2"],
        "deepseek-v3": "openrouter:deepseek/deepseek-v3-base:free",
        "deepseek-v3-0324": ["openrouter:deepseek/deepseek-chat-v3-0324:free", "openrouter:deepseek/deepseek-chat-v3-0324"],
        "deepseek-r1-zero": "openrouter:deepseek/deepseek-r1-zero:free",
        "deepseek-r1-distill-llama-8b": "openrouter:deepseek/deepseek-r1-distill-llama-8b",
        "deepseek-r1-distill-qwen-1.5b": "openrouter:deepseek/deepseek-r1-distill-qwen-1.5b",
        "deepseek-r1-distill-qwen-32b": ["openrouter:deepseek/deepseek-r1-distill-qwen-32b:free", "openrouter:deepseek/deepseek-r1-distill-qwen-32b"],
        "deepseek-r1-distill-qwen-14b": ["openrouter:deepseek/deepseek-r1-distill-qwen-14b:free", "openrouter:deepseek/deepseek-r1-distill-qwen-14b"],
        "deepseek-r1-distill-llama-70b": ["openrouter:deepseek/deepseek-r1-distill-llama-70b:free", "openrouter:deepseek/deepseek-r1-distill-llama-70b"],
        "deepseek-r1": ["deepseek-reasoner", "openrouter:deepseek/deepseek-r1:free", "openrouter:deepseek/deepseek-r1"],
        "deepseek-chat": ["deepseek-chat", "openrouter:deepseek/deepseek-chat:free", "openrouter:deepseek/deepseek-chat"],
        "deepseek-coder": "openrouter:deepseek/deepseek-coder",
        "deepseek-chat-v3.1": "openrouter:deepseek/deepseek-chat-v3.1",
        "deepseek-r1-0528": "openrouter:deepseek/deepseek-r1-0528:free",
        "deepseek-v3.1-terminus": "openrouter:deepseek/deepseek-v3.1-terminus",
        "deepseek-v3.2": "openrouter:deepseek/deepseek-v3.2",
        "deepseek-v3.2-exp": "openrouter:deepseek/deepseek-v3.2-exp"
    },
    perplexity: {
        "sonar-reasoning-pro": "openrouter:perplexity/sonar-reasoning-pro",
        "sonar-pro": "openrouter:perplexity/sonar-pro",
        "sonar-deep-research": "openrouter:perplexity/sonar-deep-research",
        "r1-1776": "openrouter:perplexity/r1-1776",
        "sonar-reasoning": "openrouter:perplexity/sonar-reasoning",
        "sonar": "openrouter:perplexity/sonar",
        "llama-3.1-sonar-small-online": "openrouter:perplexity/llama-3.1-sonar-small-128k-online",
        "llama-3.1-sonar-large-online": "openrouter:perplexity/llama-3.1-sonar-large-128k-online"
    },
    xai: {
        "grok-3-mini": "openrouter:x-ai/grok-3-mini-beta",
        "grok-3-beta": "openrouter:x-ai/grok-3-beta",
        "grok-2": "openrouter:x-ai/grok-2",
        "grok": ["grok-beta", "openrouter:x-ai/grok-beta"],
        "grok-beta": "openrouter:x-ai/grok-beta",
        "grok-3": "openrouter:x-ai/grok-3",
        "grok-vision": "openrouter:x-ai/grok-vision-beta"
    },
    cohere: {
        "command-r7b": "openrouter:cohere/command-r7b-12-2024",
        "command-r-plus": ["openrouter:cohere/command-r-plus-08-2024", "openrouter:cohere/command-r-plus"],
        "command": "openrouter:cohere/command",
        "command-r": ["openrouter:cohere/command-r-08-2024", "openrouter:cohere/command-r"],
        "command-a": "openrouter:cohere/command-a"
    },
    microsoft: {
        "phi-3-mini": "openrouter:microsoft/phi-3-mini-128k-instruct",
        "phi-3-medium": "openrouter:microsoft/phi-3-medium-128k-instruct",
        "phi-3.5-mini": "openrouter:microsoft/phi-3.5-mini-128k-instruct",
        "phi-4": "openrouter:microsoft/phi-4",
        "phi-4-multimodal": "openrouter:microsoft/phi-4-multimodal-instruct",
        "phi-4-reasoning": "openrouter:microsoft/phi-4-reasoning:free",
        "phi-4-reasoning-plus": ["openrouter:microsoft/phi-4-reasoning-plus:free", "openrouter:microsoft/phi-4-reasoning-plus"],
        "wizardlm-2-8x22b": "openrouter:microsoft/wizardlm-2-8x22b",
        "mai-ds-r1": "openrouter:microsoft/mai-ds-r1"
    },
    others: {
        "hermes-2-dpo": "openrouter:nousresearch/nous-hermes-2-mixtral-8x7b-dpo",
        "hermes-2-pro": "openrouter:nousresearch/hermes-2-pro-llama-3-8b",
        "hermes-3-70b": "openrouter:nousresearch/hermes-3-llama-3.1-70b",
        "hermes-3-405b": "openrouter:nousresearch/hermes-3-llama-3.1-405b",
        "deephermes-3-8b": "openrouter:nousresearch/deephermes-3-llama-3-8b-preview:free",
        "deephermes-3-24b": "openrouter:nousresearch/deephermes-3-mistral-24b-preview:free",
        "reka-flash": "openrouter:rekaai/reka-flash-3:free",
        "inflection-3-productivity": "openrouter:inflection/inflection-3-productivity",
        "inflection-3-pi": "openrouter:inflection/inflection-3-pi",
        "glm-4": ["openrouter:thudm/glm-4-32b:free", "openrouter:thudm/glm-4-32b"],
        "glm-4-32b": ["openrouter:thudm/glm-4-32b:free", "openrouter:thudm/glm-4-32b"],
        "glm-z1-32b": ["openrouter:thudm/glm-z1-32b:free", "openrouter:thudm/glm-z1-32b"],
        "glm-4-9b": "openrouter:thudm/glm-4-9b:free",
        "glm-z1-9b": "openrouter:thudm/glm-z1-9b:free",
        "glm-z1-rumination-32b": "openrouter:thudm/glm-z1-rumination-32b",
        "minimax": "openrouter:minimax/minimax-01",
        "dolphin-3.0-r1-24b": "openrouter:cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
        "dolphin-3.0-24b": "openrouter:cognitivecomputations/dolphin3.0-mistral-24b:free",
        "dolphin-8x22b": "openrouter:cognitivecomputations/dolphin-mixtral-8x22b",
        "deepcoder-14b": "openrouter:agentica-org/deepcoder-14b-preview:free",
        "kimi-vl-thinking": "openrouter:moonshotai/kimi-vl-a3b-thinking:free",
        "moonlight-16b": "openrouter:moonshotai/moonlight-16b-a3b-instruct:free",
        "qwerky-72b": "openrouter:featherless/qwerky-72b:free",
        "lfm-7b": "openrouter:liquid/lfm-7b",
        "lfm-3b": "openrouter:liquid/lfm-3b",
        "lfm-40b": "openrouter:liquid/lfm-40b",
        "jamba-large-1.7": "openrouter:ai21/jamba-large-1.7",
        "jamba-mini-1.7": "openrouter:ai21/jamba-mini-1.7",
        "aion-1.0": "openrouter:aion-labs/aion-1.0",
        "aion-1.0-mini": "openrouter:aion-labs/aion-1.0-mini",
        "aion-rp-llama-3.1-8b": "openrouter:aion-labs/aion-rp-llama-3.1-8b",
        "codellama-7b-instruct-solidity": "openrouter:alfredpros/codellama-7b-instruct-solidity",
        "tongyi-deepresearch-30b-a3b": "openrouter:alibaba/tongyi-deepresearch-30b-a3b",
        "molmo-2-8b": "openrouter:allenai/molmo-2-8b:free",
        "olmo-2-0325-32b-instruct": "openrouter:allenai/olmo-2-0325-32b-instruct",
        "olmo-3-32b-think": "openrouter:allenai/olmo-3-32b-think",
        "olmo-3-7b-instruct": "openrouter:allenai/olmo-3-7b-instruct",
        "olmo-3-7b-think": "openrouter:allenai/olmo-3-7b-think",
        "olmo-3.1-32b-instruct": "openrouter:allenai/olmo-3.1-32b-instruct",
        "olmo-3.1-32b-think": "openrouter:allenai/olmo-3.1-32b-think",
        "goliath-120b": "openrouter:alpindale/goliath-120b",
        "nova-2-lite-v1": "openrouter:amazon/nova-2-lite-v1",
        "nova-lite-v1": "openrouter:amazon/nova-lite-v1",
        "nova-micro-v1": "openrouter:amazon/nova-micro-v1",
        "nova-premier-v1": "openrouter:amazon/nova-premier-v1",
        "nova-pro-v1": "openrouter:amazon/nova-pro-v1",
        "magnum-v4-72b": "openrouter:anthracite-org/magnum-v4-72b",
        "coder-large": "openrouter:arcee-ai/coder-large",
        "maestro-reasoning": "openrouter:arcee-ai/maestro-reasoning",
        "spotlight": "openrouter:arcee-ai/spotlight",
        "trinity-mini": "openrouter:arcee-ai/trinity-mini:free",
        "virtuoso-large": "openrouter:arcee-ai/virtuoso-large",
        "ernie-4.5-21b-a3b": "openrouter:baidu/ernie-4.5-21b-a3b",
        "ernie-4.5-21b-a3b-thinking": "openrouter:baidu/ernie-4.5-21b-a3b-thinking",
        "ernie-4.5-300b-a47b": "openrouter:baidu/ernie-4.5-300b-a47b",
        "ernie-4.5-vl-28b-a3b": "openrouter:baidu/ernie-4.5-vl-28b-a3b",
        "ernie-4.5-vl-424b-a47b": "openrouter:baidu/ernie-4.5-vl-424b-a47b",
        "seed-1.6": "openrouter:bytedance-seed/seed-1.6",
        "seed-1.6-flash": "openrouter:bytedance-seed/seed-1.6-flash",
        "ui-tars-1.5-7b": "openrouter:bytedance/ui-tars-1.5-7b",
        "dolphin-mistral-24b-venice-edition": "openrouter:cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
        "cogito-v2-preview-llama-109b-moe": "openrouter:deepcogito/cogito-v2-preview-llama-109b-moe",
        "cogito-v2-preview-llama-405b": "openrouter:deepcogito/cogito-v2-preview-llama-405b",
        "cogito-v2-preview-llama-70b": "openrouter:deepcogito/cogito-v2-preview-llama-70b",
        "cogito-v2.1-671b": "openrouter:deepcogito/cogito-v2.1-671b",
        "llemma_7b": "openrouter:eleutherai/llemma_7b",
        "rnj-1-instruct": "openrouter:essentialai/rnj-1-instruct",
        "mythomax-l2-13b": "openrouter:gryphe/mythomax-l2-13b",
        "granite-4.0-h-micro": "openrouter:ibm-granite/granite-4.0-h-micro",
        "mercury": "openrouter:inception/mercury",
        "kat-coder-pro": "openrouter:kwaipilot/kat-coder-pro",
        "lfm-2.2-6b": "openrouter:liquid/lfm-2.2-6b",
        "lfm2-8b-a1b": "openrouter:liquid/lfm2-8b-a1b",
        "weaver": "openrouter:mancer/weaver",
        "longcat-flash-chat": "openrouter:meituan/longcat-flash-chat",
        "minimax-m1": "openrouter:minimax/minimax-m1",
        "minimax-m2": "openrouter:minimax/minimax-m2",
        "morph-v3-fast": "openrouter:morph/morph-v3-fast",
        "lumimaid-8b": "openrouter:neversleep/llama-3.1-lumimaid-8b",
        "noromaid-20b": "openrouter:neversleep/noromaid-20b",
        "deepseek-v3.1-nex-n1": "openrouter:nex-agi/deepseek-v3.1-nex-n1",
        "hermes-4-405b": "openrouter:nousresearch/hermes-4-405b",
        "hermes-4-70b": "openrouter:nousresearch/hermes-4-70b",
        "internvl3-78b": "openrouter:opengvlab/internvl3-78b",
        "intellect-3": "openrouter:prime-intellect/intellect-3",
        "sorcererlm-8x22b": "openrouter:raifle/sorcererlm-8x22b",
        "relace-apply-3": "openrouter:relace/relace-apply-3",
        "relace-search": "openrouter:relace/relace-search",
        "cydonia-24b": "openrouter:thedrummer/cydonia-24b-v4.1",
        "rocinante-12b": "openrouter:thedrummer/rocinante-12b",
        "skyfall-36b": "openrouter:thedrummer/skyfall-36b-v2",
        "unslopnemo-12b": "openrouter:thedrummer/unslopnemo-12b",
        "remm-slerp-l2-13b": "openrouter:undi95/remm-slerp-l2-13b",
        "mimo-v2-flash": "openrouter:xiaomi/mimo-v2-flash:free",
        "glm-4.5": "openrouter:z-ai/glm-4.5",
        "glm-4.6": "openrouter:z-ai/glm-4.6",
        "glm-4.7": "openrouter:z-ai/glm-4.7"
    }
};

// Driver selection logic based on model characteristics
const driverData = {
    openai: ["gpt-", "o1", "o3", "o4"],
    mistral: ["mistral", "mixtral", "pixtral", "ministral", "codestral"],
    xai: ["grok"],
    claude: ["claude"],
    deepseek: ["deepseek"],
    gemini: ["gemini", "gemma"],
};

function getDriverForModel(model) {
    if (model.includes("openrouter:")) return "openrouter";

    for (const [driver, keywords] of Object.entries(driverData)) {
        if (keywords.some(k => model.toLowerCase().includes(k))) return driver;
    }

    return "openrouter";
}

function getModelId(shortName) {
    if (!shortName) return "gpt-4o-mini";

    // Search in all categories
    for (const category in models) {
        if (models[category][shortName]) {
            const alias = models[category][shortName];
            if (Array.isArray(alias)) {
                return alias[Math.floor(Math.random() * alias.length)];
            }
            return alias;
        }
    }

    return shortName;
}

function getAllModels() {
    const all = {};
    for (const category in models) {
        Object.assign(all, models[category]);
    }
    return all;
}

function getModelsByCategory(category) {
    return models[category] || {};
}

function getModelInfo(modelId) {
    const all = getAllModels();
    for (const [short, full] of Object.entries(all)) {
        if (Array.isArray(full)) {
            if (full.includes(modelId)) return { shortName: short, fullId: modelId };
        } else {
            if (full === modelId) return { shortName: short, fullId: modelId };
        }
    }
    return { shortName: modelId.replace('openrouter:', ''), fullId: modelId };
}

function getCategories() {
    return Object.keys(models);
}

module.exports = {
    models,
    getDriverForModel,
    getModelId,
    getAllModels,
    getModelsByCategory,
    getCategories,
    getModelInfo
};
