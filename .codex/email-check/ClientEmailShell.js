"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientStyles = exports.clientColors = void 0;
exports.default = ClientEmailShell;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const emailBrand_1 = require("./emailBrand");
const siteUrl = "https://digitales.pk";
exports.clientColors = {
    gold: "#F0B428",
    night: "#0A0610",
    surface: "#15101E",
    raised: "#1E1629",
    border: "#322342",
    text: "#EDE7F4",
    muted: "#A89FB5",
    purple: "#6B2D8B",
    purpleDeep: "#3D1450",
    link: "#C9A8E8",
};
exports.clientStyles = {
    colors: exports.clientColors,
    block: {
        backgroundColor: exports.clientColors.raised,
        border: `1px solid ${exports.clientColors.border}`,
        borderRadius: "14px",
        padding: "22px 20px",
    },
    row: {
        borderBottom: `1px solid ${exports.clientColors.border}`,
        padding: "14px 0",
    },
    rowLast: {
        paddingTop: "14px",
    },
    label: {
        margin: "0 0 6px",
        color: exports.clientColors.gold,
        WebkitTextFillColor: exports.clientColors.gold,
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
    },
    value: {
        margin: "0",
        color: "#FFFFFF",
        WebkitTextFillColor: "#FFFFFF",
        fontSize: "15px",
        fontWeight: "700",
        lineHeight: "1.65",
    },
    linkValue: {
        color: exports.clientColors.link,
        WebkitTextFillColor: exports.clientColors.link,
        fontSize: "15px",
        fontWeight: "700",
        lineHeight: "1.65",
        textDecoration: "none",
    },
    bodyText: {
        margin: "0",
        color: exports.clientColors.text,
        WebkitTextFillColor: exports.clientColors.text,
        fontSize: "16px",
        lineHeight: "1.75",
    },
    mutedText: {
        margin: "18px 0 0",
        color: exports.clientColors.muted,
        WebkitTextFillColor: exports.clientColors.muted,
        fontSize: "15px",
        lineHeight: "1.8",
    },
    note: {
        marginTop: "18px",
        backgroundColor: "#21142D",
        backgroundImage: "linear-gradient(180deg, #21142D 0%, #21142D 100%)",
        border: `1px solid ${exports.clientColors.purple}`,
        borderRadius: "14px",
        padding: "18px 20px",
    },
    button: {
        borderRadius: "999px",
        backgroundColor: exports.clientColors.gold,
        color: exports.clientColors.purpleDeep,
        WebkitTextFillColor: exports.clientColors.purpleDeep,
        fontSize: "14px",
        fontWeight: "800",
        textDecoration: "none",
        padding: "14px 22px",
    },
};
function ClientEmailShell({ preview, eyebrow, title, intro, children, cta, }) {
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsxs)(components_1.Head, { children: [(0, jsx_runtime_1.jsx)("meta", { name: "color-scheme", content: "light" }), (0, jsx_runtime_1.jsx)("meta", { name: "supported-color-schemes", content: "light" }), (0, jsx_runtime_1.jsx)("style", { children: `
          :root {
            color-scheme: light;
            supported-color-schemes: light;
          }

          u + .body .gmail-screen {
            background: #000000;
            mix-blend-mode: screen;
          }

          u + .body .gmail-difference {
            background: #000000;
            mix-blend-mode: difference;
          }

          [data-ogsc] .gmail-screen {
            background: #000000 !important;
          }

          [data-ogsc] .gmail-difference {
            background: #000000 !important;
          }
        ` })] }), (0, jsx_runtime_1.jsx)(components_1.Preview, { children: preview }), (0, jsx_runtime_1.jsx)(components_1.Body, { className: "body", style: {
                    margin: 0,
                    padding: "0",
                    backgroundColor: exports.clientColors.night,
                    backgroundImage: `linear-gradient(180deg, ${exports.clientColors.night} 0%, ${exports.clientColors.night} 100%)`,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    color: exports.clientColors.text,
                    WebkitTextFillColor: exports.clientColors.text,
                }, children: (0, jsx_runtime_1.jsx)("div", { className: "gmail-screen", children: (0, jsx_runtime_1.jsx)("div", { className: "gmail-difference", children: (0, jsx_runtime_1.jsx)(components_1.Section, { style: {
                                backgroundColor: exports.clientColors.night,
                                backgroundImage: `linear-gradient(180deg, ${exports.clientColors.night} 0%, ${exports.clientColors.night} 100%)`,
                                padding: "28px 12px",
                            }, children: (0, jsx_runtime_1.jsxs)(components_1.Container, { style: {
                                    width: "100%",
                                    maxWidth: "640px",
                                    margin: "0 auto",
                                    backgroundColor: exports.clientColors.surface,
                                    backgroundImage: `linear-gradient(180deg, ${exports.clientColors.surface} 0%, ${exports.clientColors.surface} 100%)`,
                                    border: `1px solid ${exports.clientColors.border}`,
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                }, children: [(0, jsx_runtime_1.jsxs)(components_1.Section, { style: {
                                            padding: "28px 24px",
                                            backgroundColor: exports.clientColors.night,
                                            backgroundImage: `linear-gradient(180deg, ${exports.clientColors.night} 0%, ${exports.clientColors.night} 100%)`,
                                            borderBottom: `1px solid ${exports.clientColors.border}`,
                                        }, children: [(0, jsx_runtime_1.jsx)(components_1.Img, { src: `cid:${emailBrand_1.emailLogoCid}`, width: "170", alt: "Digitales", style: { display: "block", marginBottom: "22px", height: "auto" } }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: {
                                                    margin: "0 0 10px",
                                                    color: exports.clientColors.gold,
                                                    WebkitTextFillColor: exports.clientColors.gold,
                                                    fontSize: "12px",
                                                    fontWeight: "700",
                                                    letterSpacing: "0.18em",
                                                    textTransform: "uppercase",
                                                }, children: eyebrow }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: {
                                                    margin: "0",
                                                    color: "#FFFFFF",
                                                    WebkitTextFillColor: "#FFFFFF",
                                                    fontSize: "28px",
                                                    lineHeight: "1.25",
                                                    fontWeight: "800",
                                                }, children: title }), intro ? ((0, jsx_runtime_1.jsx)(components_1.Text, { style: {
                                                    margin: "16px 0 0",
                                                    color: exports.clientColors.muted,
                                                    WebkitTextFillColor: exports.clientColors.muted,
                                                    fontSize: "15px",
                                                    lineHeight: "1.75",
                                                }, children: intro })) : null] }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: { padding: "24px" }, children: [children, cta ? ((0, jsx_runtime_1.jsx)(components_1.Section, { style: { marginTop: "24px", textAlign: "center" }, children: (0, jsx_runtime_1.jsx)(components_1.Button, { href: cta.href, style: exports.clientStyles.button, children: cta.label }) })) : null] }), (0, jsx_runtime_1.jsxs)(components_1.Section, { style: {
                                            padding: "22px 24px",
                                            backgroundColor: exports.clientColors.night,
                                            backgroundImage: `linear-gradient(180deg, ${exports.clientColors.night} 0%, ${exports.clientColors.night} 100%)`,
                                            borderTop: `1px solid ${exports.clientColors.border}`,
                                        }, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: {
                                                    margin: "0",
                                                    color: exports.clientColors.text,
                                                    WebkitTextFillColor: exports.clientColors.text,
                                                    fontSize: "13px",
                                                    lineHeight: "1.7",
                                                }, children: "Smart Technology. High-Impact Marketing. Built to Perform." }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: { margin: "12px 0 0", fontSize: "13px", lineHeight: "1.7" }, children: (0, jsx_runtime_1.jsx)(components_1.Link, { href: siteUrl, style: {
                                                        color: exports.clientColors.gold,
                                                        WebkitTextFillColor: exports.clientColors.gold,
                                                        textDecoration: "none",
                                                    }, children: "Website" }) }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: {
                                                    margin: "12px 0 0",
                                                    color: "#7E738D",
                                                    WebkitTextFillColor: "#7E738D",
                                                    fontSize: "12px",
                                                    lineHeight: "1.6",
                                                }, children: "Digitales, Lahore, Pakistan" })] })] }) }) }) }) })] }));
}
