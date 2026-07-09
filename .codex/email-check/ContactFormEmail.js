"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContactFormEmail;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const ClientEmailShell_1 = __importStar(require("./ClientEmailShell"));
function ContactFormEmail({ name = "Digitales visitor", email = "hello@example.com", service = "Not specified", message = "I would like to learn more about Digitales services.", }) {
    return ((0, jsx_runtime_1.jsxs)(ClientEmailShell_1.default, { preview: "Thank you for reaching out to Digitales", eyebrow: "Contact request received", title: "Thank you for reaching out", children: [(0, jsx_runtime_1.jsxs)(components_1.Text, { style: ClientEmailShell_1.clientStyles.bodyText, children: ["Hi ", name, ", thanks for contacting Digitales. We have received your message and our team will review it carefully."] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: ClientEmailShell_1.clientStyles.mutedText, children: "You can expect a response within 24-48 hours. If your request is urgent, reply directly to this email and we will do our best to prioritize it." }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: { ...ClientEmailShell_1.clientStyles.block, marginTop: "24px" }, children: [(0, jsx_runtime_1.jsx)(Detail, { label: "Name", value: name }), (0, jsx_runtime_1.jsx)(Detail, { label: "Email", value: email, href: `mailto:${email}` }), (0, jsx_runtime_1.jsx)(Detail, { label: "Selected Service", value: service }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: ClientEmailShell_1.clientStyles.rowLast, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: ClientEmailShell_1.clientStyles.label, children: "Message" }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: {
                                    ...ClientEmailShell_1.clientStyles.bodyText,
                                    margin: 0,
                                    color: ClientEmailShell_1.clientStyles.colors.muted,
                                    WebkitTextFillColor: ClientEmailShell_1.clientStyles.colors.muted,
                                    whiteSpace: "pre-wrap",
                                }, children: message })] })] }), (0, jsx_runtime_1.jsx)(components_1.Section, { style: ClientEmailShell_1.clientStyles.note, children: (0, jsx_runtime_1.jsx)(components_1.Text, { style: { ...ClientEmailShell_1.clientStyles.bodyText, margin: 0 }, children: "Friendly note: this confirmation means your request was successfully submitted to Digitales." }) })] }));
}
function Detail({ label, value, href, }) {
    return ((0, jsx_runtime_1.jsxs)(components_1.Section, { style: ClientEmailShell_1.clientStyles.row, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: ClientEmailShell_1.clientStyles.label, children: label }), href ? ((0, jsx_runtime_1.jsx)(components_1.Link, { href: href, style: ClientEmailShell_1.clientStyles.linkValue, children: value })) : ((0, jsx_runtime_1.jsx)(components_1.Text, { style: ClientEmailShell_1.clientStyles.value, children: value }))] }));
}
