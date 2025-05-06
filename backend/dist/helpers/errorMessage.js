"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
const getErrorMessage = (error) => {
    const err = error;
    return { status: 400, message: err.message };
};
exports.getErrorMessage = getErrorMessage;
