"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CartSchema = new mongoose.Schema({
    dateCreated: { type: String, required: true },
    items: [{
            product: {
                id: { type: String },
                title: { type: String },
                price: { type: Number },
                category: { type: String },
                imageUrl: { type: String },
            },
            quantity: { type: Number, default: 0 }
        }]
});
//# sourceMappingURL=cart.model.js.map