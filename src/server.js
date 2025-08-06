// Load environment variables
require('dotenv').config();

const { Hono } = require('hono');
const { serve } = require('@hono/node-server');
const { callOpenRouter, initializeBrowser, cleanup } = require('./worker.js');
const { getAllModels, getModelsByCategory, getCategories, getModelInfo } = require('./model.js');

const app = new Hono();

app.get('/', (c) => c.text('OpenRouter API Wrapper is running.'));

app.post('/chat', async (c) => {
    const body = await c.req.json();
    
    // Extract all possible parameters from request
    const query = body.query;
    const model = body.model || process.env.DEFAULT_MODEL || 'mistral-tiny';
    const imageUrl = body.imageUrl || null; // Single image URL for vision models
    const imageUrls = body.imageUrls || null; // Array of image URLs
    const messages = body.messages || null; // Array of message objects for conversation context
    const testMode = body.testMode === true; // Boolean for test mode
    const options = body.options || {}; // Additional options (stream, max_tokens, temperature, tools)
    
    // If no query and no messages, use a default
    if (!query && !messages) {
        return c.json({ success: false, error: "Either 'query' or 'messages' parameter is required" }, 400);
    }

    try {
        const response = await callOpenRouter({
            query,
            model,
            imageUrl,
            imageUrls,
            messages,
            testMode,
            options
        });
        
        return c.json({ 
            success: true, 
            response 
        });
    } catch (err) {
        return c.json({ success: false, error: err.message });
    }
});

// Get all available models
app.get('/api/models', (c) => {
    const allModels = getAllModels();
    const modelList = Object.entries(allModels).map(([shortName, fullId]) => {
        const info = getModelInfo(fullId);
        return {
            shortName,
            fullId,
            provider: fullId.split('/')[1] || 'Unknown'
        };
    });
    
    return c.json({ 
        models: modelList,
        total: modelList.length
    });
});

// Get models by category
app.get('/api/models/:category', (c) => {
    const category = c.req.param('category');
    const categoryModels = getModelsByCategory(category);
    
    if (Object.keys(categoryModels).length === 0) {
        return c.json({ error: 'Category not found' }, 404);
    }
    
    const modelList = Object.entries(categoryModels).map(([shortName, fullId]) => ({
        shortName,
        fullId,
        provider: fullId.split('/')[1] || 'Unknown'
    }));
    
    return c.json({ 
        category,
        models: modelList,
        total: modelList.length
    });
});

// Get all categories
app.get('/api/categories', (c) => {
    const categories = getCategories();
    return c.json({ categories });
});

const port = process.env.API_PORT || 3001;

// Initialize browser and test it with a simple call when server starts
async function initServer() {
    try {
        // First just initialize the browser
        await initializeBrowser();
        console.log('✅ Browser initialized successfully');
        
        // Then do a test call
        try {
            const testMessage = process.env.INIT_MESSAGE || "Hi";
            const defaultModel = process.env.DEFAULT_MODEL || "mistral-tiny";
            const response = await callOpenRouter({
                query: testMessage,
                model: defaultModel
            });
            console.log('✅ Test call successful');
        } catch (err) {
            console.error('❌ Test call failed, but browser is ready:', err.message);
        }
    } catch (err) {
        console.error('❌ Failed to initialize browser:', err.message);
    }

    console.log(`🚀 OpenRouter API Wrapper is running on port ${port}`);
}

// Initialize the server
initServer();

// Setup graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await cleanup();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await cleanup();
    process.exit(0);
});

serve({
    fetch: app.fetch,
    port
}); 