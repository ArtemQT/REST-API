import { routeInterface } from "../interface's/routeInterface"

import { usersGetObj } from "./usersRoutes/usersGET"
import { usersPostObj } from "./usersRoutes/usersPOST"
import { usersPutObj } from "./usersRoutes/usersPUT"
import { usersDeleteObj } from "./usersRoutes/usersDELETE";
import { usersCopyObj } from "./usersRoutes/usersCOPY"
import { usersMoveObj } from "./usersRoutes/usersMOVE"

export const arrayOfRoutes: routeInterface[] = [
    usersGetObj,
    usersPostObj,
    usersPutObj,
    usersDeleteObj,
    usersCopyObj,
    usersMoveObj
]