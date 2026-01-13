<div align="center">
  <h1>Mux</h1>
  <p>High-performance Node.js API wrapper for Puter.js</p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
  [![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
  [![Models](https://img.shields.io/badge/Models-250+-blue.svg)](#features)
</div>

---

Mux is a high-performance, pure Node.js API wrapper for Puter.js. It provides direct access to over 250 AI models including Claude 3.7, GPT-4o, and DeepSeek-R1 with native streaming, vision, and function calling support.

## Features

- 🚀 **High-Performance**: Optimized HTTP communication bypassing browser overhead
- 🤖 **250+ AI Models**: OpenAI, Anthropic, Google, Meta, DeepSeek, and more
- 📡 **Advanced Streaming**: Real-time token delivery with reasoning support
- 👁️ **Vision Support**: Multimodal tasks via image URL processing
- 🔧 **Function Calling**: Native tool/function calling with parallel execution
- 🔄 **Model Rotation**: Automatic load balancing across model endpoints
- 🔐 **Secure Storage**: Local token management

## Quick Start

### Installation
```bash
npm install
```

### Launch Server
```bash
npm start
```

### Authentication
On first run, provide your `puter.auth.token` from the [Puter Playground](https://docs.puter.com/playground/).

## API Overview

The API server runs on **port 1862** by default.

### Basic Usage

```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Hello, how are you?",
    "model": "gpt-4o-mini"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "Hello! I'm here and ready to help you. How can I assist you today?",
  "model": "openrouter:openai/gpt-4o-mini"
}
```

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chat` | POST | Chat completion with streaming, vision, and function calling |
| `/api/models` | GET | List all 250+ available models |
| `/api/categories` | GET | List all provider categories |
| `/api/models/:category` | GET | Get models by provider (e.g., `anthropic`, `openai`) |

### Core Features

#### 💬 Chat Completion
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Explain quantum computing",
    "model": "claude-3.5-sonnet"
  }'
```

#### 📡 Streaming
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Write a poem",
    "options": {"stream": true}
  }' --no-buffer
```

#### 👁️ Vision/Image Analysis
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is in this image?",
    "model": "gpt-4o",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

#### 🔧 Function Calling
```bash
curl -X POST http://localhost:1862/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the weather in NYC?",
    "model": "gpt-4o",
    "options": {
      "tools": [{
        "type": "function",
        "function": {
          "name": "get_weather",
          "parameters": {...}
        }
      }]
    }
  }'
```

## Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | Simple text query |
| `messages` | array | Array of message objects with `role` and `content` |
| `model` | string | Model identifier (default: `gpt-4o-mini`) |
| `imageUrl` | string | Single image URL for vision tasks |
| `imageUrls` | array | Multiple image URLs |
| `options.stream` | boolean | Enable streaming response |
| `options.tools` | array | Function/tool definitions |
| `options.tool_choice` | string | `auto`, `required`, or `none` |
| `options.parallel_tool_calls` | boolean | Enable parallel function calls |
| `options.temperature` | number | Sampling temperature (0-2) |
| `options.top_p` | number | Nucleus sampling |
| `options.frequency_penalty` | number | Reduce repetition (-2 to 2) |
| `options.presence_penalty` | number | Encourage diversity (-2 to 2) |
| `options.response_format` | object | Force JSON output: `{"type": "json_object"}` |
| `options.reasoning_effort` | string | For reasoning models: `low`, `medium`, `high` |

## Response Format

**Standard Response:**
```json
{
  "success": true,
  "response": "The AI response text",
  "reasoning": "Optional reasoning tokens (for reasoning models)",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  },
  "tool_calls": [],
  "model": "openrouter:openai/gpt-4o-mini"
}
```

**Streaming Response:**  
Plain text stream of response tokens.

## Documentation

📚 **[Complete API Examples](./docs/API_EXAMPLES.md)** - Detailed examples with curl commands for all features

## Popular Models

- **OpenAI**: `gpt-4o`, `gpt-4o-mini`, `o1`, `o1-mini`
- **Anthropic**: `claude-3.7-sonnet`, `claude-3.5-sonnet`, `claude-3-opus`
- **Google**: `gemini-2.0-flash`, `gemini-1.5-pro`
- **DeepSeek**: `deepseek-r1`, `deepseek-v3`
- **Meta**: `llama-3.3-70b`, `llama-3.1-405b`
- **xAI**: `grok-2`, `grok-beta`

View all 250+ models: `curl http://localhost:1862/api/models`

