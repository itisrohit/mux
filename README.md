# Mux

Mux is a Node.js API wrapper for Puter.js that provides access to various AI models through OpenRouter. It offers persistent browser sessions, streaming responses, and vision model support.

## Features

- **Persistent Sessions**: Browser sessions persist between API calls
- **Model Selection**: Access 100+ models from OpenAI, Anthropic, Mistral, Meta, Google, and more
- **Streaming Support**: Stream AI responses token by token (supported by most models)
- **Vision Model Support**: Send images to vision-capable models
- **Clean API**: Simple REST API interface

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

Send a text query to any supported model:

```
POST /chat
```

Request body:

```json
{
  "query": "Write a short poem about AI",
  "model": "gpt-4o",
  "imageUrl": null  // Optional: URL to image for vision models
}
```

Response:

```json
{
  "success": true,
  "response": "In silicon minds, ideas bloom,\nCreativity in a digital room.\nAI weaves patterns once unknown,\nA dance of thought, not flesh and bone.\nHuman and machine, hand in hand,\nForging futures none had planned."
}
```

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
- Vision models require a valid image URL that is accessible to the server
- Some vision models may have trouble processing certain image formats or complex visuals
- For best vision model results, use direct image URLs from reliable sources (avoid redirects)
- Use `gpt-4o`, `claude-sonnet-4`, or `phi-4-multimodal-instruct` for the most reliable image processing
- Some models may have restrictions or rate limits through the OpenRouter service
- If a vision model fails, try a different model or check that your image URL is directly accessible