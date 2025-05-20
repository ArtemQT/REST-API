"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkURL = checkURL;
function checkURL(urlReq, url) {
    if (typeof url === "string") {
        return (urlReq === url);
    }
    else if (url instanceof RegExp) {
        return (url.test(urlReq));
    }
    return false;
}
