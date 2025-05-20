"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainUsersFileSystemController = mainUsersFileSystemController;
const parseURLbody_1 = require("../externalFunctions/parseURLbody");
const UserFileSystemModel_1 = require("../models/UserFileSystemModel");
const path = __importStar(require("path"));
function mainUsersFileSystemController(req, res) {
    switch (req.url) {
        case "/API/users/copy": {
            operationWithFileFunc(req, res, UserFileSystemModel_1.copyFileModel);
            break;
        }
        case "/API/users/move": {
            operationWithFileFunc(req, res, UserFileSystemModel_1.moveFileModel);
            break;
        }
        default: {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        }
    }
}
async function operationWithFileFunc(req, res, fileOperation) {
    try {
        const body = await (0, parseURLbody_1.parseURLBody)(req);
        const { sourcePath, destinationPath } = JSON.parse(body);
        if (!sourcePath || !destinationPath) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'Validation failed',
                details: 'Source path and destination path are required'
            }));
            return;
        }
        const normalizedSource = path.normalize(sourcePath);
        const normalizedDest = path.normalize(destinationPath);
        const bodyURlObj = {
            sourcePath: normalizedSource,
            destinationPath: normalizedDest
        };
        const message = await fileOperation(bodyURlObj);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: message }));
    }
    catch (err) {
        console.error('File error:', err);
        if (err.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'File not found',
                details: err.message
            }));
        }
        else if (err.code === 'EACCES') {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'Permission denied',
                details: err.message
            }));
        }
        else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'File operation failed',
                details: err.message
            }));
        }
    }
}
