"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./user.model");
const token_model_1 = require("./token.model");
const nestjs_mailgun_1 = require("@nextnm/nestjs-mailgun");
const mailGunConfig = require("../common/mailGunConfig");
const dotenv = require("dotenv");
dotenv.config();
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_model_1.UserSchema }, { name: 'Token', schema: token_model_1.TokenSchema }]),
            nestjs_mailgun_1.MailgunModule.forRoot(mailGunConfig.mailGun())
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map