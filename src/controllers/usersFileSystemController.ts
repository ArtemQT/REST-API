import { IncomingMessage, ServerResponse } from "http";
import { parseURLBody } from "../externalFunctions/parseURLbody";
import { copyFileModel, moveFileModel } from "../models/UserFileSystemModel"
import * as path from "path";
import { BodyFileSystemInterface } from "../interface's/bodyFileSystemInterface";

interface IFileOperation {
    (body: BodyFileSystemInterface): Promise<string>;
}

export function mainUsersFileSystemController(req: IncomingMessage, res: ServerResponse) {
    switch (req.url) {
        case "/API/users/copy":{
            operationWithFileFunc(req, res, copyFileModel);
            break;
        }
        case "/API/users/move" :{
            operationWithFileFunc(req,res, moveFileModel);
            break;
        }
        default: {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        }
    }
}

async function operationWithFileFunc(req: IncomingMessage, res: ServerResponse, fileOperation: IFileOperation) {
    try {
        const body: string = await parseURLBody(req);
        const { sourcePath, destinationPath } = JSON.parse(body);
        if (!sourcePath || !destinationPath) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'Validation failed',
                details: 'Source path and destination path are required'
            }));
            return;
        }
        const normalizedSource: string = path.normalize(sourcePath);
        const normalizedDest: string = path.normalize(destinationPath);

        const bodyURlObj: BodyFileSystemInterface = {
            sourcePath: normalizedSource,
            destinationPath: normalizedDest
        }

        const message: string = await fileOperation(bodyURlObj);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: message }));
    }
    catch (err: any) {
        console.error('File error:', err);
        if (err.code === 'ENOENT') {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                error: 'File not found',
                details: err.message
            }));
        } else if (err.code === 'EACCES') {
            res.writeHead(403, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                error: 'Permission denied',
                details: err.message
            }));
        } else {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                error: 'File operation failed',
                details: err.message
            }));
        }
    }
}