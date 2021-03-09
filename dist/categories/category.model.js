"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CategorySchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
});
//# sourceMappingURL=category.model.js.map