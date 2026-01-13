<div align="center">
  <h1>Mux</h1>
  <p>High-performance Node.js API wrapper for Puter.js</p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
  [![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
  [![Models](https://img.shields.io/badge/Models-200+-blue.svg)](#discovery)
</div>

---

Mux is a high-performance, pure Node.js API wrapper for Puter.js. It provides direct access to over 200 AI models including Claude 3.7, GPT-4o-mini, and DeepSeek-R1 with native streaming and vision support.

## Key Features
- **High-Performance Implementation**: Optimized HTTP communication bypassing browser overhead.
- **Comprehensive Model Support**: Native access to OpenAI, Anthropic, Google, Meta, and DeepSeek.
- **Advanced Streaming**: Real-time token delivery via Server-Sent Events, including reasoning tokens.
- **Vision Integration**: Support for multimodal tasks via image URL processing.
- **Model Alias Rotation**: Models with multiple endpoints are automatically load-balanced/rotated to ensure high availability and bypass rate limits.
- **Simplified Configuration**: Efficient token management with local secure storage.

## Quick Start

1. **Installation**
   ```bash
   npm install
   ```

2. **Launch**
   ```bash
   npm start
   ```

3. **Authentication**
   On the first run, follow the terminal prompt to provide your `puter.auth.token` from the [Puter Playground](https://docs.puter.com/playground/).

## API Reference
The API server listens on port **1862** by default.

### Chat Completion
`POST /chat`

**Base Request**
```json
{
  "query": "Explain the concept of neural networks",
  "model": "gpt-4o-mini",
  "options": {
    "stream": true
  }
}
```

**Vision Request**
```json
{
  "query": "Analyze these architectural diagrams",
  "model": "gpt-4o-mini",
  "imageUrls": ["https://example.com/diagram.jpg"]
}
```

### Discovery
- `GET /api/categories`: List all provider categories.
- `GET /api/models`: List all 200+ supported models.
- `GET /api/models/:category`: List models for a specific provider (e.g., `anthropic`).
