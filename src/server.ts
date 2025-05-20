import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import { Router } from "./routes/mainRouter";

const PORT: number = +(process.env.port || 3000);

function createServerCallback(req: IncomingMessage, res: ServerResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Router.route(req, res);
}

function listenServerCallback(){
    console.log(`Server listening on port ${PORT}`);
}

const server = http
                            .createServer(createServerCallback)
                            .listen(PORT, listenServerCallback)