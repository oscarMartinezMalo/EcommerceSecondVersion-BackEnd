import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    validateRequest(req: any) {
        const token = req.headers['auth-token'].split(' ')[1];
        if (!token) { return false; }  // Return 403 Forbidden Error resource that you're not allowed to access

        try {
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = verified;  // Save user in the req body
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token!!!');  // 401 Unauthorized error you first log in with a valid user ID and password
        }
    }
}