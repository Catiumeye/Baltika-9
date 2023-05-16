import { Injectable } from "@nestjs/common";
import { User } from "../user.entity";



@Injectable()
export class UserHelper {
    constructor() {}

    checkRolePermission(actionAuthor: User, userToAction: User): boolean {
        return  actionAuthor.role === 'ADMIN' && userToAction.role !== 'ADMIN' ? true : 
                actionAuthor.role === 'MODER' && userToAction.role !== 'ADMIN' &&  userToAction.role !== 'MODER' ? true : 
                false;
    }
}