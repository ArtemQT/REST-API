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
exports.findUsersData = findUsersData;
exports.createUserData = createUserData;
exports.findUserByID = findUserByID;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
const PATH = path.resolve(__dirname, '../', "usersData.json");
// Функция для чтения массива JSON из файла
async function readJSON(path) {
    try {
        const data = await fs_1.promises.readFile(path, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        throw error;
    }
}
async function writeJSON(path, content) {
    return await fs_1.promises.writeFile(path, JSON.stringify(content), "utf-8");
}
function findUsersData() {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await readJSON(PATH);
            resolve(data);
        }
        catch (err) {
            reject(err);
        }
    });
}
function createUserData(userData) {
    return new Promise(async (resolve, reject) => {
        try {
            let usersDataJSON = await readJSON(PATH);
            const newUser = {
                id: (0, uuid_1.v4)(),
                ...userData,
            };
            usersDataJSON.push(newUser);
            await writeJSON(PATH, usersDataJSON);
            resolve("new user successfully created");
        }
        catch (error) {
            reject(error);
        }
    });
}
function findUserByID(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const usersDataJSON = await readJSON(PATH);
            console.log('Loaded users data:', usersDataJSON); // Отладочное сообщение
            const user = usersDataJSON.find(User => User.id === id);
            console.log('Searching for user with ID:', id, 'Found:', user); // Отладочное сообщение
            if (user) {
                resolve(user);
            }
            else {
                reject("User not found");
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
function updateUser(userUpdateData) {
    return new Promise(async (resolve, reject) => {
        try {
            const usersDataJSON = await readJSON(PATH);
            const index = usersDataJSON.findIndex(user => user.id === userUpdateData.id);
            usersDataJSON[index] = userUpdateData;
            await writeJSON(PATH, usersDataJSON);
            resolve("user successfully updated");
        }
        catch (error) {
            reject(error);
        }
    });
}
function deleteUser(id) {
    return new Promise(async (resolve, reject) => {
        let usersDataJSON = await readJSON(PATH);
        usersDataJSON = usersDataJSON.filter(user => user.id !== id);
        await writeJSON(PATH, usersDataJSON);
        resolve("user successfully deleted");
    });
}
