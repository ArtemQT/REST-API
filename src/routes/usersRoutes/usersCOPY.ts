import { routeInterface } from "../../interface's/routeInterface"
import { IncomingMessage, ServerResponse } from "http";
import { checkURL } from "../../externalFunctions/checkURL"
import { Controllers } from "../../controllers/mainController";

export const usersCopyObj: routeInterface = {
    url: "/API/users/copy",
    method: "POST",
    controller(req: IncomingMessage, res: ServerResponse) {
        Controllers.usersFileSystemController(req, res);
    },
    isEqual(url: string): boolean {
        return checkURL(url, this.url)
    }
}