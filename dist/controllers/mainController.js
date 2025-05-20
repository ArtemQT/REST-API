"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const usersFileSystemController_1 = require("./usersFileSystemController");
const usersDataController_1 = require("./usersDataController");
class Controllers {
    static usersDataController(req, res) {
        (0, usersDataController_1.mainUsersControllerFunc)(req, res);
    }
    static usersFileSystemController(req, res) {
        (0, usersFileSystemController_1.mainUsersFileSystemController)(req, res);
    }
}
exports.Controllers = Controllers;
