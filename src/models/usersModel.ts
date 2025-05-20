import {UserDataInterface} from "../interface's/userDataInterface";
import {promises as fs}  from 'fs';
import * as path from 'path';
import {v4 as uuidv4} from "uuid"

const PATH: string = path.resolve(__dirname, '../', "usersData.json");

// Функция для чтения массива JSON из файла
async function readJSON(path: string): Promise<UserDataInterface[]> {
    try {
        const data : string = await fs.readFile(path, "utf-8");
        return JSON.parse(data) as UserDataInterface[];
    }
    catch (error) {
        throw error;
    }
}

async function writeJSON(path: string, content: UserDataInterface[]): Promise<void> {
    return await fs.writeFile(path, JSON.stringify(content), "utf-8")
}

export function findUsersData(): Promise<UserDataInterface[]> {
    return new Promise(async(resolve, reject) => {
        try{
            const data: UserDataInterface[] = await readJSON(PATH);
            resolve(data);
        }
        catch (err){
            reject(err);
        }
    })
}

export function createUserData(userData: UserDataInterface): Promise<string> {
    return new Promise(async(resolve, reject) => {
        try{
            let usersDataJSON: UserDataInterface[] = await readJSON(PATH);
            const newUser: UserDataInterface = {
                id: uuidv4(),
                ...userData,
            }
            usersDataJSON.push(newUser);
            await writeJSON(PATH, usersDataJSON)
            resolve("new user successfully created");
        }
        catch (error) {
            reject(error);
        }
    })
}

export function findUserByID(id: string): Promise<UserDataInterface> {
    return new Promise(async(resolve, reject) => {
        try{
            const usersDataJSON: UserDataInterface[] = await readJSON(PATH);
            console.log('Loaded users data:', usersDataJSON); // Отладочное сообщение
            const user: UserDataInterface | undefined = usersDataJSON.find(User => User.id === id);
            console.log('Searching for user with ID:', id, 'Found:', user); // Отладочное сообщение
            if (user){
                resolve(user);
            }
            else {
                reject("User not found");
            }
        }
        catch (error) {
            reject(error);
        }
    })
}

export function updateUser(userUpdateData: UserDataInterface): Promise<string> {
    return new Promise(async(resolve, reject) => {
        try{
            const usersDataJSON: UserDataInterface[] = await readJSON(PATH);
            const index: number = usersDataJSON.findIndex(user => user.id === userUpdateData.id);
            usersDataJSON[index] = userUpdateData;
            await writeJSON(PATH, usersDataJSON)
            resolve("user successfully updated");
        }
        catch (error) {
            reject(error);
        }
    })
}

export function deleteUser(id: string): Promise<string> {
    return new Promise(async(resolve, reject) => {
        let usersDataJSON: UserDataInterface[] = await readJSON(PATH);
        usersDataJSON = usersDataJSON.filter(user => user.id !== id);
        await writeJSON(PATH, usersDataJSON)
        resolve("user successfully deleted");
    })
}