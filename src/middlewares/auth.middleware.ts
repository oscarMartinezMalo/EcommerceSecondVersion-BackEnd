import { NestMiddleware, UnauthorizedException, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { Request } from "express-serve-static-core";
import { Response } from "express";

// Right Now I'm not using this middleware because I'm using the Guard to validate
// If you are gonna use this you can set a global scope to use it in all
// routes the example is in the product.module
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const header = req.headers;
        const token = header['auth-token'];

        if (!token) { throw new UnauthorizedException('You dont have access!!!'); }

        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.body.user = verified;  // Save user in the req body
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid Token!!!');
        }
    }
}
