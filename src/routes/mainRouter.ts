import { IncomingMessage, ServerResponse } from "http";
import { arrayOfRoutes } from "./collectionRoutes"
import { routeInterface } from "../interface's/routeInterface";

export class Router {
    static route(req: IncomingMessage, res: ServerResponse):void {
        const requestURL: string = req.url!;
        const requestMethod: string = req.method!;

        const route: routeInterface | undefined = arrayOfRoutes.find((route) => {
            return route.isEqual(requestURL) && route.method === requestMethod;
        })

        if (route){
            route.controller(req, res);
        }
        else{
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.write('message: Error 404, API not found\n');
            res.write('Possible API routes\n');
            arrayOfRoutes.forEach(route => {
                res.write(`${route.url}, method - ${route.method}\n`);
            })
            res.end();
        }
    }
}