"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
exports.authConfig = {
    secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "fallback_secret"
};
exports.default = exports.authConfig;
