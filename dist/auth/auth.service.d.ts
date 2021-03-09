import { Model } from "mongoose";
import { Token } from "./token.model";
import { User } from "./user.model";
import { MailgunService } from "@nextnm/nestjs-mailgun";
export declare class AuthService {
    private readonly userModel;
    private readonly tokenModel;
    private mailgunService;
    constructor(userModel: Model<User>, tokenModel: Model<Token>, mailgunService: MailgunService);
    createAccount(email: string, password: string): Promise<string>;
    logIn(email: string, password: string): Promise<{
        accessToken: any;
        refreshToken: any;
        id: string;
        email: string;
        role: string;
    }>;
    resetPassword(user: {
        id: string;
        email: string;
    }, currentPassword: string, newPassword: string): Promise<{
        accessToken: any;
        refreshToken: any;
        id: string;
        email: string;
        role: string;
    }>;
    forgotPassword(email: string): Promise<void>;
    forgotPasswordToken(email: string, newPassword: string, resetToken: string): Promise<void>;
    saveRefreshToken(token: string): Promise<void>;
    getNewAccessToken(refreshToken: string): Promise<{
        accessToken: any;
    }>;
    private generateAccessToken;
    logOut(refreshToken: string): Promise<void>;
}
