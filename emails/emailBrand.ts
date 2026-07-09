import { readFileSync } from "fs";
import path from "path";

const logoPath = path.join(process.cwd(), "public", "Digitales logo.png");
const logoBuffer = readFileSync(logoPath);

export const embeddedLogoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;
export const emailLogoCid = "digitales-logo";
export const emailLogoBase64 = logoBuffer.toString("base64");
