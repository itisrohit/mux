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

async function callOpenRouter(query, model = 'mistral-tiny', imageUrl = null) {
    // Convert short model name to full OpenRouter ID using model.js
    const fullModelId = getModelId(model);
    console.log('Starting OpenRouter call with model:', fullModelId);
    
    // Initialize browser if not already done
    await initializeBrowser();

    // Evaluate and return full response
    const response = await page.evaluate(async ({ query, fullModelId, imageUrl }) => {
        console.log('Starting chat with puter...');
        const parts = [];
        let response;
        
        if (imageUrl) {
            // Vision models need the image URL
            console.log('Using vision mode with image:', imageUrl);
            response = await puter.ai.chat(query, imageUrl, { model: fullModelId, stream: true });
        } else {
            // Standard text models
            response = await puter.ai.chat(query, { model: fullModelId, stream: true });
        }

        for await (const part of response) {
            if (part?.text) parts.push(part.text);
        }

        return parts.join('');
    }, { query, fullModelId, imageUrl });

    return response;
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