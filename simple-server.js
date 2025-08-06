// Load environment variables
require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('test-puter.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

const PORT = process.env.TEST_PAGE_PORT || 8081;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 