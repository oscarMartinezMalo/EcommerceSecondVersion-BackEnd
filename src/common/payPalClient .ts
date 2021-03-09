import * as checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import * as dotenv from 'dotenv';
dotenv.config();

//  Returns PayPal HTTP client instance with environment that has access
//  credentials context. Use this instance to invoke PayPal APIs, provided the
//  credentials have access.

export function client() {
    let clientId = process.env.PAYPAL_CLIENT_ID || 'PAYPAL-SANDBOX-CLIENT-ID';
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'PAYPAL-SANDBOX-CLIENT-SECRET';
   return new checkoutNodeJssdk.core.SandboxEnvironment( clientId, clientSecret);
}