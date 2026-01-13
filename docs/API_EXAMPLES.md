# API Examples

Complete examples for all Mux API endpoints with curl commands and responses.

## Table of Contents
- [Chat Completion](#chat-completion)
- [Advanced Parameters](#advanced-parameters)
- [Function/Tool Calling](#functiontool-calling)
- [Model Discovery](#model-discovery)

---

## Chat Completion

### Basic Query
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Hello, how are you?"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "Hello! I'm just a program, but I'm here and ready to help you. How can I assist you today?",
  "model": "openrouter:openai/gpt-4o-mini"
}
```

### With Specific Model
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is 2+2?",
    "model": "gpt-4o"
  }'
```

### Using Messages Array
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Tell me a joke"}
    ],
    "model": "claude-3.5-sonnet"
  }'
```

### Streaming Response
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Write a short poem about rust.",
    "model": "gpt-4o-mini",
    "options": {"stream": true}
  }' \
  --no-buffer
```

### Vision/Image Analysis

#### Single Image
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is in this image?",
    "model": "gpt-4o",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "This image shows an orange tabby cat with distinct stripes on its fur and yellowish eyes, looking directly at the camera.",
  "model": "openrouter:openai/gpt-4o"
}
```

#### Multiple Images
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Describe this image in detail",
    "model": "gpt-4o",
    "imageUrls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
  }'
```

---

## Advanced Parameters

### Temperature Control
Control randomness in responses (0 = deterministic, 2 = very random).

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Say hello",
    "model": "gpt-4o-mini",
    "options": {
      "temperature": 0.5
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "Hello! How can I assist you today?",
  "model": "openrouter:openai/gpt-4o-mini"
}
```

### JSON Mode
Force the model to output valid JSON.

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Generate a person profile in JSON",
    "model": "gpt-4o",
    "options": {
      "response_format": {"type": "json_object"},
      "temperature": 0.7
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "{\n  \"firstName\": \"John\",\n  \"lastName\": \"Doe\",\n  \"age\": 30,\n  \"occupation\": \"Software Developer\",\n  \"skills\": [\"JavaScript\", \"Python\", \"React\"]\n}",
  "model": "openrouter:openai/gpt-4o"
}
```

### Reasoning Models
Use reasoning models with adjustable effort levels.

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is 15 * 23?",
    "model": "deepseek-r1",
    "options": {
      "reasoning_effort": "high"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "15 × 23 = 345",
  "reasoning": "We are asked: \"What is 15 * 23?\" This is a simple multiplication problem. We can compute it directly.\n\n15 * 23 = 15 * (20 + 3) = 15*20 + 15*3 = 300 + 45 = 345.",
  "model": "deepseek-reasoner"
}
```

### Top-P (Nucleus Sampling)
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Count from 1 to 3",
    "model": "gpt-4o-mini",
    "options": {
      "top_p": 0.8
    }
  }'
```

### Presence & Frequency Penalties
Reduce repetition and encourage topic diversity.

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Write 3 words"}
    ],
    "model": "gpt-4o-mini",
    "options": {
      "presence_penalty": 0.5,
      "frequency_penalty": 0.5
    }
  }'
```

### Combined Parameters
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "List 3 colors",
    "model": "gpt-4o-mini",
    "options": {
      "temperature": 0.3,
      "top_p": 0.9,
      "presence_penalty": 0.2
    }
  }'
```

### Additional Supported Parameters (Untested)

The following parameters are supported by the API but have not been tested with examples yet:

#### Logit Bias
Advanced token-level control to increase or decrease the likelihood of specific tokens.

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Say something",
    "model": "gpt-4o-mini",
    "options": {
      "logit_bias": {
        "50256": -100
      }
    }
  }'
```

#### Voice (Audio Models)
Specify voice for audio-enabled models.

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Read this text",
    "model": "gpt-4o-audio",
    "options": {
      "voice": "alloy",
      "modalities": ["text", "audio"]
    }
  }'
```

#### Modalities
Control multimodal input/output types.

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Process this",
    "model": "gpt-4o",
    "options": {
      "modalities": ["text", "audio"]
    }
  }'
```

#### Audio
Audio input/output configuration.

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Transcribe this",
    "model": "gpt-4o-audio",
    "options": {
      "audio": {
        "voice": "alloy",
        "format": "wav"
      }
    }
  }'
```

> **Note:** These parameters are passed through to the underlying Puter API but have not been fully tested. Use with caution and refer to the model provider's documentation for specific parameter requirements.

---

## Function/Tool Calling

### Single Tool Call
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the weather in San Francisco?",
    "model": "gpt-4o",
    "options": {
      "tools": [
        {
          "type": "function",
          "function": {
            "name": "get_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
              "type": "object",
              "properties": {
                "location": {
                  "type": "string",
                  "description": "The city and state, e.g. San Francisco, CA"
                },
                "unit": {
                  "type": "string",
                  "enum": ["celsius", "fahrenheit"]
                }
              },
              "required": ["location"]
            }
          }
        }
      ]
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "",
  "tool_calls": [
    {
      "type": "function",
      "index": 0,
      "id": "call_OKTY8oLDsuOpuwO2xYzkH6lf",
      "function": {
        "name": "get_weather",
        "arguments": "{\"location\":\"San Francisco, CA\"}"
      }
    }
  ],
  "model": "openrouter:openai/gpt-4o"
}
```

### Parallel Tool Calls
Execute multiple function calls simultaneously.

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Get the weather in New York and London",
    "model": "gpt-4o",
    "options": {
      "tools": [
        {
          "type": "function",
          "function": {
            "name": "get_weather",
            "description": "Get weather for a location",
            "parameters": {
              "type": "object",
              "properties": {
                "location": {"type": "string"}
              },
              "required": ["location"]
            }
          }
        }
      ],
      "parallel_tool_calls": true
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "",
  "tool_calls": [
    {
      "type": "function",
      "index": 0,
      "id": "call_EGjMFS7jwcuEWB3YXFkTFLM4",
      "function": {
        "name": "get_weather",
        "arguments": "{\"location\": \"New York\"}"
      }
    },
    {
      "type": "function",
      "index": 1,
      "id": "call_ly9h97jMFrAKOUXXwSNb9qiv",
      "function": {
        "name": "get_weather",
        "arguments": "{\"location\": \"London\"}"
      }
    }
  ],
  "model": "openrouter:openai/gpt-4o"
}
```

### Force Tool Usage
Use `tool_choice: "required"` to force the model to call a function.

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Send an email to john@example.com with subject Hello",
    "model": "gpt-4o",
    "options": {
      "tools": [
        {
          "type": "function",
          "function": {
            "name": "send_email",
            "description": "Send an email to a recipient",
            "parameters": {
              "type": "object",
              "properties": {
                "to": {"type": "string"},
                "subject": {"type": "string"},
                "body": {"type": "string"}
              },
              "required": ["to", "subject"]
            }
          }
        }
      ],
      "tool_choice": "required"
    }
  }'
```

---

## Model Discovery

### Get All Categories
```bash
curl http://localhost:1862/api/categories
```

**Response:**
```json
{
  "categories": [
    "anthropic", "openai", "google", "mistral", "meta", 
    "nvidia", "qwen", "deepseek", "perplexity", "xai",
    "cohere", "microsoft", "nousresearch", "liquid",
    "inflection", "amazon", "bytedance", "baidu", 
    "moonshot", "ai21", "allenai", "thudm", "zai",
    "minimax", "cognitivecomputations", "arcee",
    "alibaba", "xiaomi", "neversleep", "thedrummer", "others"
  ],
  "total": 31
}
```

### Get All Models
```bash
curl http://localhost:1862/api/models
```

**Response:**
```json
{
  "models": [
    {
      "shortName": "gpt-4o",
      "fullId": "openrouter:openai/gpt-4o",
      "variants": ["openrouter:openai/gpt-4o"],
      "isRotationModel": false
    },
    ...
  ],
  "total": 250
}
```

### Get Models by Category
```bash
# Anthropic models
curl http://localhost:1862/api/models/anthropic

# OpenAI models
curl http://localhost:1862/api/models/openai

# Google models
curl http://localhost:1862/api/models/google
```
