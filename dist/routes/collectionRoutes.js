"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayOfRoutes = void 0;
const usersGET_1 = require("./usersRoutes/usersGET");
const usersPOST_1 = require("./usersRoutes/usersPOST");
const usersPUT_1 = require("./usersRoutes/usersPUT");
const usersDELETE_1 = require("./usersRoutes/usersDELETE");
const usersCOPY_1 = require("./usersRoutes/usersCOPY");
const usersMOVE_1 = require("./usersRoutes/usersMOVE");
exports.arrayOfRoutes = [
    usersGET_1.usersGetObj,
    usersPOST_1.usersPostObj,
    usersPUT_1.usersPutObj,
    usersDELETE_1.usersDeleteObj,
    usersCOPY_1.usersCopyObj,
    usersMOVE_1.usersMoveObj
];
