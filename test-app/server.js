/**
 * Zero-dependency static server for the PCOM self-test app.
 *
 * Serves test-app/public/, substituting {{ENV}} / {{env}} placeholders in HTML
 * files with the environment name, so the same source produces three "versions"
 * of the app (dev, stg, prod) on separate ports.
 *
 * Usage: node test-app/server.js [dev|stg|prod] [port]
 * Default ports: dev=3001, stg=3002, prod=3003.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORTS = { dev: 3001, stg: 3002, prod: 3003 };
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const env = process.argv[2] || 'dev';
if (!DEFAULT_PORTS[env]) {
    console.error(`Unknown environment "${env}". Use one of: ${Object.keys(DEFAULT_PORTS).join(', ')}.`);
    process.exit(1);
}
const port = Number(process.argv[3]) || DEFAULT_PORTS[env];
const publicDir = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
    let filePath = path.normalize(path.join(publicDir, urlPath === '/' ? 'index.html' : urlPath));
    if (!filePath.startsWith(publicDir)) {
        res.writeHead(403);
        return res.end('Forbidden');
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('Not found');
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        if (ext === '.html') {
            const html = data.toString()
                .replace(/{{ENV}}/g, env.toUpperCase())
                .replace(/{{env}}/g, env);
            return res.end(html);
        }
        res.end(data);
    });
});

server.listen(port, () => {
    console.log(`PCOM test app (${env}) listening on http://localhost:${port}`);
});
