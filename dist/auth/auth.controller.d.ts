import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getCredentials(user: {
        id: string;
        email: string;
        role: string;
    }): {
        id: string;
        email: string;
        role: string;
    };
    signUp(completeBody: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    logIn(completeBody: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: any;
        refreshToken: any;
        id: string;
        email: string;
        role: string;
    }>;
    resetPassword(completeBody: {
        currentPassword: string;
        newPassword: string;
    }, user: {
        id: string;
        email: string;
    }): Promise<{
        accessToken: any;
        refreshToken: any;
        id: string;
        email: string;
        role: string;
    }>;
    forgotPassword(completeBody: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    forgotPasswordToken(completeBody: {
        email: string;
        newPassword: string;
        forgotPasswordToken: string;
    }): Promise<{
        message: string;
    }>;
    resfreshToken(refreshToken: any): Promise<{
        accessToken: any;
    }>;
    deleteRefreshToken(token: string): Promise<any>;
}
