"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const collectionRoutes_1 = require("./collectionRoutes");
class Router {
    static route(req, res) {
        const requestURL = req.url;
        const requestMethod = req.method;
        const route = collectionRoutes_1.arrayOfRoutes.find((route) => {
            return route.isEqual(requestURL) && route.method === requestMethod;
        });
        if (route) {
            route.controller(req, res);
        }
        else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.write('message: Error 404, API not found\n');
            res.write('Possible API routes\n');
            collectionRoutes_1.arrayOfRoutes.forEach(route => {
                res.write(`${route.url}, method - ${route.method}\n`);
            });
            res.end();
        }
    }
}
exports.Router = Router;
