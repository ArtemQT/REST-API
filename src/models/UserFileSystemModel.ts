import { BodyFileSystemInterface } from "../interface's/bodyFileSystemInterface";
import {promises as fs}  from 'fs';

export async function copyFileModel(body: BodyFileSystemInterface): Promise<string> {
    return new Promise(async (resolve, reject):Promise<void> => {
        try {
            await fs.copyFile(body.sourcePath, body.destinationPath);
            resolve("File copied successfully");
        }
        catch (error) {
            reject(error);
        }
    })
}

export async function moveFileModel(body: BodyFileSystemInterface): Promise<string> {
    return new Promise(async (resolve, reject):Promise<void> => {
        try {
            await fs.rename(body.sourcePath, body.destinationPath);
            resolve("File move successfully");
        }
        catch (error) {
            reject(error);
        }
    })
}