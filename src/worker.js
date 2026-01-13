const readline = require('readline');
const { saveToken } = require('./config.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Manual Token Assistant
 */
function manualInput() {
    console.log('\n--- 🔑 Puter Token Assistant ---');
    console.log('1. Go to: https://docs.puter.com/playground/');
    console.log('2. Open Browser Console (Right Click -> Inspect -> Console)');
    console.log('3. Find "puter.auth.token" in LocalStorage by running this command:');
    console.log('   👉 localStorage.getItem("puter.auth.token")');
    console.log('4. Copy that long token and paste it below:');

    rl.question('\nPaste your Puter Token here: ', (token) => {
        if (token && token.trim().length > 20) {
            saveToken(token.trim());
            console.log('\n✅ Token saved successfully! Mux is starting up...');
            rl.close();
            process.exit(0);
        } else {
            console.log('\n❌ Invalid token. Please make sure you copied the entire string.');
            manualInput();
        }
    });
}

if (require.main === module) {
    manualInput();
}

module.exports = { manualInput };