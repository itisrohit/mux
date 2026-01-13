const { spawn } = require('child_process');
const { hasToken } = require('./src/config.js');

async function start() {
    // Check if the Puter token exists
    if (!hasToken()) {
        console.log('⚠️  Puter token not found.');
        console.log('🚀 Running token extraction utility...');

        // Run worker.js to get the token
        const extractor = spawn('node', ['src/worker.js'], { stdio: 'inherit' });

        await new Promise((resolve) => {
            extractor.on('exit', () => resolve());
        });
    }

    if (!hasToken()) {
        console.error('❌ Failed to obtain Puter token. Please run "npm run token" manually.');
        process.exit(1);
    }

    console.log('🚀 Starting Mux API Server...');
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
        apiServer.kill('SIGINT');
        process.exit(0);
    });
}

start();
