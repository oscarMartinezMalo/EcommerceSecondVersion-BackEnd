"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: { type: String, required: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 1024 },
    role: { type: String, required: true },
    date: { type: String, default: Date.now },
    resetToken: { type: String, default: '' }
});
//# sourceMappingURL=user.model.js.map