"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFileModel = copyFileModel;
exports.moveFileModel = moveFileModel;
const fs_1 = require("fs");
async function copyFileModel(body) {
    return new Promise(async (resolve, reject) => {
        try {
            await fs_1.promises.copyFile(body.sourcePath, body.destinationPath);
            resolve("File copied successfully");
        }
        catch (error) {
            reject(error);
        }
    });
}
async function moveFileModel(body) {
    return new Promise(async (resolve, reject) => {
        try {
            await fs_1.promises.rename(body.sourcePath, body.destinationPath);
            resolve("File move successfully");
        }
        catch (error) {
            reject(error);
        }
    });
}
