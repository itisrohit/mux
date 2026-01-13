const fs = require('fs');
const path = require('path');

const TOKEN_FILE = path.join(__dirname, '..', '.puter_token');

/**
 * Get the Puter token from the local file
 */
function getToken() {
    if (fs.existsSync(TOKEN_FILE)) {
        return fs.readFileSync(TOKEN_FILE, 'utf8').trim();
    }
    return null;
}

/**
 * Save the Puter token to the local file
 */
function saveToken(token) {
    fs.writeFileSync(TOKEN_FILE, token, 'utf8');
}

/**
 * Check if the token exists
 */
function hasToken() {
    return getToken() !== null;
}

module.exports = {
    getToken,
    saveToken,
    hasToken
};
