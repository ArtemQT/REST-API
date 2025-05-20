"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersMoveObj = void 0;
const checkURL_1 = require("../../externalFunctions/checkURL");
const mainController_1 = require("../../controllers/mainController");
exports.usersMoveObj = {
    url: "/API/users/move",
    method: "POST",
    controller(req, res) {
        mainController_1.Controllers.usersFileSystemController(req, res);
    },
    isEqual(url) {
        return (0, checkURL_1.checkURL)(url, this.url);
    }
};
