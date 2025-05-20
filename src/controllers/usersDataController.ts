import { IncomingMessage, ServerResponse } from "http";
import {findUsersData, createUserData, findUserByID, updateUser, deleteUser} from "../models/usersModel";
import { UserDataInterface } from "../interface's/userDataInterface";
import { parseURLBody } from "../externalFunctions/parseURLbody"

export async function mainUsersControllerFunc(req: IncomingMessage, res: ServerResponse): Promise<void> {
    switch (req.method) {
        case "GET":{
            GetUsersData(req,res);
            break;
        }
        case "POST":{
            PostUsersData(req,res);
            break;
        }
        case "PUT":{
            PutUserData(req, res);
            break
        }
        case "DELETE": {
            DeleteUserData(req, res);
            break;
        }
    }
}

async function GetUsersData(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try{
        const usersData: UserDataInterface[] = await findUsersData();
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.write(JSON.stringify(usersData));
        res.end();
    }
    catch(error){
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");
        res.end(`${error}`);
    }
}

async function PostUsersData(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try{
        let body: string = await parseURLBody(req);
        const {userName, userSurname, userEmail, userPassword} = JSON.parse(body);
        const userData: UserDataInterface = {
            userName,
            userSurname,
            userPassword,
            userEmail
        }
        const message: string = await createUserData(userData);
        res.statusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.write(`message: ${message}`);
        res.end();
    }
    catch(error){
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");
        res.end(`${error}`);
    }
}

async function PutUserData(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try{
        const id: string = (req.url?.split("/")[3])!;
        const user: UserDataInterface = await findUserByID(id);

        const body: string = await parseURLBody(req);
        const {userName, userSurname, userEmail, userPassword} = JSON.parse(body);
        const userDataUpdate: UserDataInterface = {
            id: user.id!,
            userName: userName || user.userName,
            userSurname: userSurname || user.userSurname,
            userPassword: userPassword || user.userPassword,
            userEmail: userEmail || user.userEmail,
        }

        const message: string = await updateUser(userDataUpdate);
        res.statusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.write(`message: ${message}`);
        res.end();
    }
    catch(error){
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");
        res.end(`${error}`);
    }
}

async function DeleteUserData(req: IncomingMessage, res: ServerResponse): Promise<void>{
    try{
        const id: string = (req.url?.split("/")[3])!;

        const user: UserDataInterface = await findUserByID(id);
        const message: string = await deleteUser(id);
        res.statusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.write(`message: ${message}`);
        res.end();
    }
    catch(error){
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");
        res.end(`${error}`);
    }
}

