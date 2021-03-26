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
const auth_service_1 = require("./auth.service");
const auth_joi_validation_1 = require("./auth-joi.validation");
const joi_validation_pipe_1 = require("../pipes/joi-validation.pipe");
const user_decorator_1 = require("../decorators/user.decorator");
const auth_guard_1 = require("../guards/auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getCredentials(user) {
        return { id: user.id, email: user.email, role: user.role };
    }
    async signUp(completeBody) {
        await this.authService.createAccount(completeBody.email, completeBody.password);
        return { message: 'User created' };
    }
    async logIn(completeBody) {
        const token = await this.authService.logIn(completeBody.email, completeBody.password);
        return token;
    }
    async resetPassword(completeBody, user) {
        const token = await this.authService.resetPassword(user, completeBody.currentPassword, completeBody.newPassword);
        return token;
    }
    async forgotPassword(completeBody) {
        await this.authService.forgotPassword(completeBody.email);
        return { message: 'A verfication code was send to you!!!' };
    }
    async forgotPasswordToken(completeBody) {
        await this.authService.forgotPasswordToken(completeBody.email, completeBody.newPassword, completeBody.forgotPasswordToken);
        return { message: 'Password was successfully reset!!!' };
    }
    async resfreshToken(refreshToken) {
        const refToken = Object.values(refreshToken)[0];
        const token = this.authService.getNewAccessToken(refToken);
        return token;
    }
    async deleteRefreshToken(token) {
        await this.authService.logOut(token);
        return null;
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCredentials", null);
__decorate([
    common_1.Post('signup'),
    common_1.UsePipes(new joi_validation_pipe_1.JoiValidationPipe(auth_joi_validation_1.registerValidationSchema)),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post('login'),
    common_1.UsePipes(new joi_validation_pipe_1.JoiValidationPipe(auth_joi_validation_1.loginValidationSchema)),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logIn", null);
__decorate([
    common_1.Put('resetPassword'),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.UsePipes(new joi_validation_pipe_1.JoiValidationPipe(auth_joi_validation_1.refreshPasswordValidationSchema)),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    common_1.Put('forgotPassword'),
    common_1.UsePipes(new joi_validation_pipe_1.JoiValidationPipe(auth_joi_validation_1.forgotPasswordValidationSchema)),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    common_1.Put('forgotPasswordToken'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPasswordToken", null);
__decorate([
    common_1.Post('refresh-token'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resfreshToken", null);
__decorate([
    common_1.Delete(':token'),
    __param(0, common_1.Param('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteRefreshToken", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map