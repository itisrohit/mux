# Mux

Mux is a Node.js API wrapper for Puter.js that provides access to various AI models through OpenRouter. It offers persistent browser sessions, streaming responses, and vision model support.

## Features

- **Persistent Sessions**: Browser sessions persist between API calls
- **Model Selection**: Access 100+ models from OpenAI, Anthropic, Mistral, Meta, Google, and more
- **Streaming Support**: Stream AI responses token by token (supported by most models)
- **Vision Model Support**: Send single or multiple images to vision-capable models
- **Conversation Context**: Provide chat history and system prompts via messages array
- **Function Calling**: Define tools/functions the AI can call in responses
- **Parameter Control**: Fine-tune outputs with temperature, max_tokens and more
- **Test Mode**: Test your implementation without consuming credits
- **Clean API**: Simple REST API interface

## Demo

![Mux API Demo - Testing Claude Opus 4](doc/example.gif)

*Demonstration of Mux API in action, testing Claude Opus 4 model capabilities*

## Setup

> ⚠️ **IMPORTANT**: This API requires a Chromium browser window to be open while running. Do not close the browser window that opens when you start the server.

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables (copy the example file if needed):
   ```
   cp .env.example .env  # If .env doesn't exist yet
   ```
   
   Available environment variables:
   ```
   # Server Ports
   API_PORT=3000                # Port for the API server
   TEST_PAGE_PORT=8080          # Port for the HTML test page
   
   # Browser Configuration
   BROWSER_HEADLESS=false       # Set to true for headless browser mode
   
   # Initial Chat Configuration
   DEFAULT_MODEL=mistral-tiny   # Default model to use
   INIT_MESSAGE="Hi"            # Test message on startup
   ```
   
4. Start both servers with a single command:
   ```
   npm start
   ```
5. This will start:
   - HTML server at `http://localhost:8080` (needed for Puter.js)
   - API server at `http://localhost:3000` (your main endpoint)

If you need to start servers individually:
- `npm run start-html` - Start only the HTML server
- `npm run start-api` - Start only the API server

## API Endpoints

### Chat Completion

Send queries to any supported model with various input formats:

```
POST /chat
```

#### Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | String | The prompt to send to the AI model |
| `model` | String | The model to use (defaults to environment variable or "mistral-tiny") |
| `imageUrl` | String | URL to a single image for vision models |
| `imageUrls` | Array | Array of image URLs for vision models |
| `messages` | Array | Array of message objects for conversation context |
| `testMode` | Boolean | Whether to use test mode (doesn't consume credits) |
| `options` | Object | Additional model options (temperature, max_tokens, etc.) |

#### Request Body Examples

**Simple Text Query**
```json
{
  "query": "Write a short poem about AI",
  "model": "gpt-4o"
}
```

**Single Image (Vision)**
```json
{
  "query": "What's in this image?",
  "model": "gpt-4o",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Multiple Images**
```json
{
  "query": "Compare these two images",
  "model": "gpt-4o",
  "imageUrls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
}
```

**Conversation Context**
```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "Tell me about quantum computing."
    }
  ],
  "model": "claude-sonnet-4"
}
```

**With Advanced Options**
```json
{
  "query": "Write a creative story",
  "model": "gpt-4o",
  "options": {
    "temperature": 1.2,
    "max_tokens": 500,
    "stream": true
  }
}
```

**Function/Tool Calls**
```json
{
  "query": "What's the weather in New York?",
  "model": "gpt-4o",
  "options": {
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "Get the weather for a location",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {
                "type": "string",
                "description": "The city and state, e.g. New York, NY"
              }
            },
            "required": ["location"]
          }
        }
      }
    ]
  }
}
```

#### Response

```json
{
  "success": true,
  "response": "In silicon minds, ideas bloom,\nCreativity in a digital room.\nAI weaves patterns once unknown,\nA dance of thought, not flesh and bone.\nHuman and machine, hand in hand,\nForging futures none had planned."
}
```

For function calls, the response may include a `tool_calls` array with function call details.

### Get All Models

```
GET /api/models
```

### Get Models by Category

```
GET /api/models/:category
```

Available categories: `anthropic`, `openai`, `google`, `mistral`, `meta`, `qwen`, `deepseek`, `perplexity`, `xai`, `cohere`, `microsoft`, `others`

### Get All Categories

```
GET /api/categories
```

## Model Capabilities

### Models with Vision Support

These models can process images via the `imageUrl` parameter:

#### Reliable Vision Models
- `gpt-4o` (OpenAI) - Excellent vision capabilities
- `claude-sonnet-4` (Anthropic) - Strong vision processing
- `phi-4-multimodal-instruct` (Microsoft) - Good for most image types

#### Vision Models with Limited Compatibility
- `gpt-4o-mini` (OpenAI) - May have reduced capabilities compared to gpt-4o
- `claude-opus-4` (Anthropic) - Works with most images but can be inconsistent
- `llama-3.2-90b-vision-instruct` (Meta) - Limited compatibility with some image formats
- `llama-3.2-11b-vision-instruct` (Meta) - May struggle with complex images
- `qwen2.5-vl-72b-instruct` (Qwen) - Occasional processing issues
- `qwen2.5-vl-32b-instruct` (Qwen) - Best with simple, clear images
- `grok-2-vision` (X.AI) - Integration may be unstable

### Example: Using Vision Models

```json
{
  "query": "What's in this image?",
  "model": "gpt-4o",
  "imageUrl": "https://example.com/path/to/image.jpg"
}
```

### Models with Strong Streaming Support

While most models support streaming, these models provide particularly smooth token-by-token streaming:

- OpenAI models (`gpt-4o`, `gpt-4o-mini`)
- Anthropic models (`claude-sonnet-4`, `claude-opus-4`)
- Mistral models (`mistral-large`, `mistral-medium`, `mistral-small`, `mistral-tiny`)
- Meta models (`llama-3.1-8b-instruct`, `llama-3.1-70b-instruct`)

## Notes

- The first request may take longer as the browser environment initializes
- **IMPORTANT: Do not close the Chromium window** that opens when the server starts - it's required for the API to function
- If the Chromium window is closed accidentally, the API will attempt to reopen it on the next request
- Browser data is stored in the `browser-data/` directory which is excluded from git
- Vision models require valid image URLs that are accessible to the server
- Some vision models may have trouble processing certain image formats or complex visuals
- For best vision model results, use direct image URLs from reliable sources (avoid redirects)
- Use `gpt-4o`, `claude-sonnet-4`, or `phi-4-multimodal-instruct` for the most reliable image processing
- When using the `messages` array format, ensure proper role designation (`system`, `user`, `assistant`, or `function`)
- For function/tool calling support, be sure to properly define the function schema in the `options.tools` array
- The `testMode` parameter can be used during development to avoid consuming credits
- Advanced options like `temperature` and `max_tokens` can be used to control response characteristics
- For multi-turn conversations, using the `messages` array format is recommended over single query prompts
- Some models may have restrictions or rate limits through the OpenRouter service
- If a vision model fails, try a different model or check that your image URL is directly accessible