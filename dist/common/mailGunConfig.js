"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
function mailGun() {
    return { DOMAIN: process.env.MAILGUN_DOMAIN, API_KEY: process.env.MAILGUN_API_KEY };
}
exports.mailGun = mailGun;
//# sourceMappingURL=mailGunConfig.js.map