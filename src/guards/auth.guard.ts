import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from "jsonwebtoken";
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/user.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    canActivate(context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(req: any) {
        const token = req.headers['auth-token'].split(' ')[1];
        if (!token) { return false; }  // Return 403 Forbidden Error resource that you're not allowed to access

        try {
            const jwtUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            //Check if user exist in the data base and retreicve the user roles
            const userStored = await this.userModel.findById(jwtUser.id);
            if (!userStored) { throw new ForbiddenException('User no exits'); }
            
            req.user = jwtUser;  // Save user in the req body
        } catch (error) {
            throw new UnauthorizedException('Invalid Token!!!');  // 401 Unauthorized error you first log in with a valid user ID and password
        }

        return true;
    }
}