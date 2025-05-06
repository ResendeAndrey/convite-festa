"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneRaw = formatPhoneRaw;
function formatPhoneRaw(phone) {
    return phone.replace(/\D/g, ""); // Remove tudo que não for número
}
