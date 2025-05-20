export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type TUrl = string | RegExp;

import {IncomingMessage, ServerResponse} from "http";

export interface routeInterface{
    url: TUrl;
    method: TMethod;
    controller(req: IncomingMessage, res: ServerResponse): void;
    isEqual(url: string): boolean;
}