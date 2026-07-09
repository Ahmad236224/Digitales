"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailLogoBase64 = exports.emailLogoCid = exports.embeddedLogoSrc = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const logoPath = path_1.default.join(process.cwd(), "public", "Digitales logo.png");
const logoBuffer = (0, fs_1.readFileSync)(logoPath);
exports.embeddedLogoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;
exports.emailLogoCid = "digitales-logo";
exports.emailLogoBase64 = logoBuffer.toString("base64");
