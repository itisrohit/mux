// Load environment variables
require('dotenv').config();

const { chromium } = require('playwright');
const { getModelId } = require('./model.js'); 
const fs = require('fs');
const path = require('path');

// Global browser instances
let browser = null;
let context = null;
let page = null;
let isInitialized = false;

async function initializeBrowser() {
    if (isInitialized && context && page && !page.isClosed()) return;
    
    // Create user data directory if it doesn't exist
    const userDataDir = path.join(__dirname, '..', 'browser-data');
    if (!fs.existsSync(userDataDir)) {
        fs.mkdirSync(userDataDir, { recursive: true });
    }
    
    console.log('Initializing browser...');
    // Use launchPersistentContext to maintain session data
    const headless = process.env.BROWSER_HEADLESS === 'true';
    context = await chromium.launchPersistentContext(userDataDir, { 
        headless: headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('Browser launched with persistent context');
    
    // Get the first page or create a new one
    const pages = context.pages();
    if (pages.length > 0) {
        page = pages[0];
    } else {
        page = await context.newPage();
    }

    // Set up dialog handler to automatically accept any dialogs
    page.on('dialog', async dialog => {
        console.log('Dialog detected:', dialog.message());
        await dialog.accept();
    });

    // Navigate to our local server
    const testPagePort = process.env.TEST_PAGE_PORT || 8081;
    await page.goto(`http://localhost:${testPagePort}/`);
    console.log(`Navigated to local server on port ${testPagePort}`);

    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    console.log('Page loaded');

    // Wait for Puter to be available with more debugging
    console.log('Waiting for puter to be available...');
    
    try {
        await page.waitForFunction(() => {
            console.log('Checking window.puter:', window.puter);
            return window.puter;
        }, { timeout: 30000 });
        console.log('Puter.js loaded successfully');
    } catch (e) {
        console.log('Failed to load puter, checking page content...');
        const content = await page.content();
        console.log('Page content length:', content.length);
        throw new Error('Puter failed to load: ' + e.message);
    }
    
    // Give the user time to manually handle any consent dialogs if needed
    console.log('Waiting a moment for any manual interaction needed...');
    await page.waitForTimeout(3000);

    // Wait a bit for Puter to initialize
    await page.waitForTimeout(3000);

    // Check if puter is available before proceeding
    puterAvailable = await page.evaluate(() => {
        console.log('Checking if puter is available...');
        console.log('window.puter:', window.puter);
        return !!window.puter;
    });
    
    if (!puterAvailable) {
        throw new Error('Puter is not available after loading');
    }

    // Mark initialization as complete
    isInitialized = true;
    console.log('Browser initialization complete');
}

async function callOpenRouter(params) {
    // Destructure parameters with defaults
    const { 
        query, 
        model = 'mistral-tiny',
        imageUrl = null,
        imageUrls = null,
        messages = null,
        testMode = false,
        options = {}
    } = params;

    // Convert short model name to full OpenRouter ID using model.js
    const fullModelId = getModelId(model);
    console.log('Starting OpenRouter call with model:', fullModelId);
    
    // Initialize browser if not already done
    await initializeBrowser();

    // Set default options and merge with provided options
    const modelOptions = {
        model: fullModelId,
        stream: true,
        ...options
    };

    // Evaluate and return full response
    const response = await page.evaluate(async ({ query, messages, imageUrl, imageUrls, testMode, modelOptions }) => {
        console.log('Starting chat with puter...');
        const parts = [];
        let response;
        
        try {
            // Handle all possible puter.ai.chat() syntax variants based on what parameters are provided
            if (messages) {
                // Messages array syntax: puter.ai.chat([messages], testMode, options)
                console.log('Using messages array format');
                response = await puter.ai.chat(messages, testMode, modelOptions);
            } else if (imageUrls && Array.isArray(imageUrls)) {
                // Multiple images: puter.ai.chat(prompt, [imageURLArray], testMode, options)
                console.log('Using multiple images:', imageUrls.length);
                response = await puter.ai.chat(query, imageUrls, testMode, modelOptions);
            } else if (imageUrl) {
                // Single image: puter.ai.chat(prompt, imageURL, testMode, options)
                console.log('Using single image:', imageUrl);
                response = await puter.ai.chat(query, imageUrl, testMode, modelOptions);
            } else {
                // Standard text: puter.ai.chat(prompt, testMode, options) or puter.ai.chat(prompt, options)
                console.log('Using standard text mode');
                if (testMode) {
                    response = await puter.ai.chat(query, testMode, modelOptions);
                } else {
                    response = await puter.ai.chat(query, modelOptions);
                }
            }

            // Handle streaming response
            if (modelOptions.stream) {
                for await (const part of response) {
                    if (part?.text) parts.push(part.text);
                    // Handle function calls if present
                    if (part?.tool_calls) {
                        console.log('Tool calls received:', part.tool_calls);
                    }
                }
                return { text: parts.join('') };
            } else {
                // For non-streaming responses, return as is
                return response;
            }
        } catch (error) {
            console.error('Error in puter.ai.chat:', error);
            throw new Error(error.message || 'Unknown error in AI chat');
        }
    }, { query, messages, imageUrl, imageUrls, testMode, modelOptions });

    // Handle tool_calls and standard responses uniformly
    if (response.text) {
        return response.text;
    } else if (response.tool_calls) {
        // If we have tool calls, return the response as is with tool_calls
        return response;
    } else {
        // For simple string responses or other formats
        return response;
    }
}

// Cleanup function to close browser
async function cleanup() {
    try {
        if (page && !page.isClosed()) {
            console.log('Closing page...');
            await page.close().catch(e => console.log('Error closing page:', e.message));
        }
        
        if (context) {
            console.log('Closing browser context...');
            await context.close().catch(e => console.log('Error closing context:', e.message));
        }
    } catch (error) {
        console.error('Error during cleanup:', error);
    } finally {
        browser = null;
        context = null;
        page = null;
        isInitialized = false;
    }
}

module.exports = { callOpenRouter, initializeBrowser, cleanup }; 