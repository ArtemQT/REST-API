import * as url from 'url';
import {IncomingMessage} from "http";

export function parseURLBody(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk.toString("utf8");
        })
        req.on('end', () => {
            resolve(body);
        })
        req.on('error', (err) => {
            reject(err);
        })
    })
}