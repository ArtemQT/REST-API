"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCopyObj = void 0;
const checkURL_1 = require("../../externalFunctions/checkURL");
const mainController_1 = require("../../controllers/mainController");
exports.usersCopyObj = {
    url: "/API/users/copy",
    method: "POST",
    controller(req, res) {
        mainController_1.Controllers.usersFileSystemController(req, res);
    },
    isEqual(url) {
        return (0, checkURL_1.checkURL)(url, this.url);
    }
};
