"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
const dotenv = require("dotenv");
dotenv.config();
function client() {
    let clientId = process.env.PAYPAL_CLIENT_ID || 'PAYPAL-SANDBOX-CLIENT-ID';
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'PAYPAL-SANDBOX-CLIENT-SECRET';
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}
exports.client = client;
//# sourceMappingURL=payPalClient .js.map