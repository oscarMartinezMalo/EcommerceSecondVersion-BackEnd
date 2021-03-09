"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.TokenSchema = new mongoose.Schema({
    token: { type: String, required: true }
});
//# sourceMappingURL=token.model.js.map