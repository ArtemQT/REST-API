import { TUrl } from "../interface's/routeInterface"

export function checkURL(urlReq: string, url: TUrl): boolean {
    if (typeof url === "string") {
        return (urlReq === url)
    }
    else if (url instanceof RegExp) {
        return (url.test(urlReq))
    }
    return false;
}