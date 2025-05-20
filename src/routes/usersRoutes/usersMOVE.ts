import { routeInterface } from "../../interface's/routeInterface"
import { IncomingMessage, ServerResponse } from "http";
import { checkURL } from "../../externalFunctions/checkURL"
import { Controllers } from "../../controllers/mainController";

export const usersMoveObj: routeInterface = {
    url: "/API/users/move",
    method: "POST",
    controller(req: IncomingMessage, res: ServerResponse) {
        Controllers.usersFileSystemController(req, res);
    },
    isEqual(url: string): boolean {
        return checkURL(url, this.url)
    }
}