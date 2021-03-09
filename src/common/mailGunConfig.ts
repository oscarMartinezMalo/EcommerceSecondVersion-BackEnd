
import * as dotenv from 'dotenv';
dotenv.config();

export function mailGun(){
    return { DOMAIN: process.env.MAILGUN_DOMAIN, API_KEY: process.env.MAILGUN_API_KEY }
}