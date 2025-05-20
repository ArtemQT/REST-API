"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainUsersControllerFunc = mainUsersControllerFunc;
const usersModel_1 = require("../models/usersModel");
const parseURLbody_1 = require("../externalFunctions/parseURLbody");
async function mainUsersControllerFunc(req, res) {
    switch (req.method) {
        case "GET": {
            GetUsersData(req, res);
            break;
        }
        case "POST": {
            PostUsersData(req, res);
            break;
        }
        case "PUT": {
            PutUserData(req, res);
            break;
        }
        case "DELETE": {
            DeleteUserData(req, res);
            break;
        }
    }
}
async function GetUsersData(req, res) {
    try {
        const usersData = await (0, usersModel_1.findUsersData)();
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.write(JSON.stringify(usersData));
        res.end();
    }
    catch (error) {
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");
        res.end(`${error}`);
    }
}
async function PostUsersData(req, res) {
    try {
        let body = await (0, parseURLbody_1.parseURLBody)(req);
        const { userName, userSurname, userEmail, userPassword } = JSON.parse(body);
        const userData = {
            userName,
            userSurname,
            userPassword,
            userEmail
        };
        const message = await (0, usersModel_1.createUserData)(userData);
        res.statusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.write(`message: ${message}`);
        res.end();
    }
    catch (error) {
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");
        res.end(`${error}`);
    }
}
async function PutUserData(req, res) {
    try {
        const id = (req.url?.split("/")[3]);
        const user = await (0, usersModel_1.findUserByID)(id);
        const body = await (0, parseURLbody_1.parseURLBody)(req);
        const { userName, userSurname, userEmail, userPassword } = JSON.parse(body);
        const userDataUpdate = {
            id: user.id,
            userName: userName || user.userName,
            userSurname: userSurname || user.userSurname,
            userPassword: userPassword || user.userPassword,
            userEmail: userEmail || user.userEmail,
        };
        const message = await (0, usersModel_1.updateUser)(userDataUpdate);
        res.statusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.write(`message: ${message}`);
        res.end();
    }
    catch (error) {
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");
        res.end(`${error}`);
    }
}
async function DeleteUserData(req, res) {
    try {
        const id = (req.url?.split("/")[3]);
        const user = await (0, usersModel_1.findUserByID)(id);
        const message = await (0, usersModel_1.deleteUser)(id);
        res.statusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.write(`message: ${message}`);
        res.end();
    }
    catch (error) {
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");
        res.end(`${error}`);
    }
}
