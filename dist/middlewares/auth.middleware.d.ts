import { NestMiddleware } from "@nestjs/common";
import { Request } from "express-serve-static-core";
import { Response } from "express";
export declare class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): void;
}
