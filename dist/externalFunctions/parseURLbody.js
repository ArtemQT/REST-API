"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseURLBody = parseURLBody;
function parseURLBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk.toString("utf8");
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
}
