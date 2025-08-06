// Load environment variables
require('dotenv').config();

const { spawn } = require('child_process');
const path = require('path');

// Start the simple server
console.log('🚀 Starting simple HTML server...');
const simpleServer = spawn('node', ['simple-server.js'], {
    stdio: 'pipe',
    shell: true
});

simpleServer.stdout.on('data', (data) => {
    console.log(`[HTML Server] ${data.toString().trim()}`);
});

simpleServer.stderr.on('data', (data) => {
    console.error(`[HTML Server ERROR] ${data.toString().trim()}`);
});

// Give the simple server a moment to start up
setTimeout(() => {
    // Start the main API server
    console.log('🚀 Starting Muxly API server...');
    const apiServer = spawn('node', ['src/server.js'], {
        stdio: 'inherit',
        shell: true
    });
    
    apiServer.on('error', (error) => {
        console.error(`Failed to start API server: ${error.message}`);
        process.exit(1);
    });
    
    // Handle process termination
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down both servers...');
        simpleServer.kill('SIGINT');
        apiServer.kill('SIGINT');
        process.exit(0);
    });
    
    process.on('SIGTERM', () => {
        console.log('\n🛑 Shutting down both servers...');
        simpleServer.kill('SIGTERM');
        apiServer.kill('SIGTERM');
        process.exit(0);
    });
}, 1000); // Wait 1 second before starting API server
