import { routeInterface } from "../../interface's/routeInterface"
import { IncomingMessage, ServerResponse } from "http";
import { checkURL } from "../../externalFunctions/checkURL"
import { Controllers } from "../../controllers/mainController";

export const usersPutObj: routeInterface = {
    url: /^\/API\/users\/[A-Za-z0-9\-]+$/,
    method: "PUT",
    controller(req: IncomingMessage, res: ServerResponse) {
        Controllers.usersDataController(req, res);
    },
    isEqual(url: string): boolean {
        return checkURL(url, this.url)
    }
}