"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const jwt = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../auth/user.model");
let RolesGuard = class RolesGuard {
    constructor(reflector, userModel) {
        this.reflector = reflector;
        this.userModel = userModel;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const token = req.headers['auth-token'].split(' ')[1];
        if (!token) {
            return false;
        }
        try {
            const jwtUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const userStored = await this.userModel.findById(jwtUser.id);
            if (!userStored) {
                throw new common_1.ForbiddenException('User no exits');
            }
            if (!this.matchRoles(roles, userStored.role))
                return false;
            req.user = jwtUser;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid Token!!!');
        }
        return true;
    }
    matchRoles(allowedRoles, userRole) {
        return allowedRoles.includes(userRole);
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [core_1.Reflector,
        mongoose_2.Model])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map