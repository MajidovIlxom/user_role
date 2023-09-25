import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import {Reflector} from '@nestjs/core'
import { ROLES_KEY } from "src/decorators/roles-decorators";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly jwtService:JwtService,private readonly reflester: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflester.getAllAndOverride<string[]>(ROLES_KEY,[context.getHandler(), context.getClass()])
        console.log(requiredRoles);
        if (!requiredRoles){
            return true
        };
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            if (!authHeader){
                throw new UnauthorizedException({
                    message: "Foydalanuvchi authrizatsiyadan o'tmagan1 "
            })
            }
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: "Foydalanuvchi authrizatsiyadan o'tmagan2 "
            })
        }
        let user: any;
            try {
                console.log('token: ', token);
                console.log(user);
                user = this.jwtService.verify(token)
            } catch (error) {
                throw new UnauthorizedException({
                    message: "Foydalanuvchi authrizatsiyadan o'tmagan3 "
            })
        }
            req.user = user

            const permisseion = user.roles.some((role: any) => requiredRoles.includes(role.value))
            if (!permisseion){
                throw new ForbiddenException({
                    message: "sizga ro'xsat etilmagan"
            })
        }
        return true;
    }
}