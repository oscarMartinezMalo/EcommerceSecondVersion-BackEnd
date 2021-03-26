import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from "jsonwebtoken";
import { Model } from 'mongoose';
import { User } from 'src/auth/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel('User') private readonly userModel: Model<User>,) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) { return true;  }

    const req = context.switchToHttp().getRequest();

    const token = req.headers['auth-token'].split(' ')[1];
    if (!token) { return false; }  // Return 403 Forbidden Error resource that you're not allowed to access

    try {
      const jwtUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      //Check if user exist in the data base and retreive the user roles
      const userStored = await this.userModel.findById(jwtUser.id);
      if (!userStored) { throw new ForbiddenException('User no exits'); }
      
      if(!this.matchRoles(roles, userStored.role)) return false;

      req.user = jwtUser;  // Save user in the req body
    } catch (error) {
      throw new UnauthorizedException('Invalid Token!!!');  // 401 Unauthorized error you first log in with a valid user ID and password
    }

    return true;
  }

  matchRoles(allowedRoles: string[], userRole: string): boolean {
      return allowedRoles.includes(userRole);
      // In case an user can have more than one role
      // allowedRoles.forEach(allowRole => { if(userRoles.includes(allowRole)) return true; })
      // return false;
    }  
}

