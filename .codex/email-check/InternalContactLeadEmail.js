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
exports.default = InternalContactLeadEmail;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const InternalEmailShell_1 = __importStar(require("./InternalEmailShell"));
function InternalContactLeadEmail({ name, email, service, message, }) {
    return ((0, jsx_runtime_1.jsxs)(InternalEmailShell_1.default, { preview: `New contact request from ${name}`, eyebrow: "Digitales Lead Alert", title: "New Contact Form Submission", intro: "A new website inquiry has been submitted and is ready for follow-up.", children: [(0, jsx_runtime_1.jsxs)(components_1.Section, { style: InternalEmailShell_1.shellStyles.block, children: [(0, jsx_runtime_1.jsx)(Detail, { label: "Name", value: name }), (0, jsx_runtime_1.jsx)(Detail, { label: "Email", value: email, href: `mailto:${email}` }), (0, jsx_runtime_1.jsx)(Detail, { label: "Selected Service", value: service, last: true })] }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: { ...InternalEmailShell_1.shellStyles.block, marginTop: "18px" }, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: InternalEmailShell_1.shellStyles.label, children: "Message" }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: {
                            ...InternalEmailShell_1.shellStyles.value,
                            fontWeight: "400",
                            color: InternalEmailShell_1.shellStyles.colors.text,
                            WebkitTextFillColor: InternalEmailShell_1.shellStyles.colors.text,
                            whiteSpace: "pre-wrap",
                        }, children: message })] })] }));
}
function Detail({ label, value, href, last = false, }) {
    return ((0, jsx_runtime_1.jsxs)(components_1.Section, { style: last ? InternalEmailShell_1.shellStyles.rowLast : InternalEmailShell_1.shellStyles.row, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: InternalEmailShell_1.shellStyles.label, children: label }), href ? ((0, jsx_runtime_1.jsx)(components_1.Link, { href: href, style: InternalEmailShell_1.shellStyles.linkValue, children: value })) : ((0, jsx_runtime_1.jsx)(components_1.Text, { style: InternalEmailShell_1.shellStyles.value, children: value }))] }));
}
