import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/user.model';
import { Model } from 'mongoose';
export declare class AuthGuard implements CanActivate {
    private readonly userModel;
    constructor(userModel: Model<User>);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    validateRequest(req: any): Promise<boolean>;
}
