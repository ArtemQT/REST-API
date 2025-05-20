import { IncomingMessage, ServerResponse } from "http";
import { mainUsersFileSystemController } from "./usersFileSystemController";
import { mainUsersControllerFunc } from "./usersDataController"

export class Controllers {
    static usersDataController(req: IncomingMessage, res: ServerResponse): void{
        mainUsersControllerFunc(req, res);
    }

    static usersFileSystemController(req: IncomingMessage, res: ServerResponse): void{
        mainUsersFileSystemController(req, res)
    }
}