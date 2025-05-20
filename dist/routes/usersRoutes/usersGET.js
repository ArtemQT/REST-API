"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersGetObj = void 0;
const checkURL_1 = require("../../externalFunctions/checkURL");
const mainController_1 = require("../../controllers/mainController");
exports.usersGetObj = {
    url: "/API/users",
    method: "GET",
    controller(req, res) {
        mainController_1.Controllers.usersDataController(req, res);
    },
    isEqual(url) {
        return (0, checkURL_1.checkURL)(url, this.url);
    }
};
