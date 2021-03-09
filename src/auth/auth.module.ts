import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "./user.model";
import { TokenSchema } from "./token.model";
import { MailgunModule } from "@nextnm/nestjs-mailgun";
import * as mailGunConfig  from '../common/mailGunConfig';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Token', schema: TokenSchema }]),
        // MailgunModule.forRoot({ DOMAIN: process.env.MAILGUN_DOMAIN, API_KEY: process.env.MAILGUN_API_KEY })
        MailgunModule.forRoot(mailGunConfig.mailGun())

    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule{

}