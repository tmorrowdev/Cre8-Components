#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCssFromUrl = void 0;
var puppeteer_1 = require("puppeteer");
// @ts-ignore: No types for 'css' package
var css = require("css"); // TODO: No @types/css found, so using 'any' where needed
var fs = require("fs/promises");
var path = require("path");
// OpenAI will be dynamically imported
// Launch headless browser, navigate to URL, and collect all CSS text (external + inline)
var extractCssFromUrl = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, cssText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle0' })];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var links, styles, fetched;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(function (l) { return l.href; });
                                    styles = Array.from(document.querySelectorAll('style')).map(function (s) { return s.innerHTML || ''; });
                                    return [4 /*yield*/, Promise.all(links.map(function (u) { return fetch(u).then(function (r) { return r.text(); }).catch(function () { return ''; }); }))];
                                case 1:
                                    fetched = _a.sent();
                                    return [2 /*return*/, __spreadArray(__spreadArray([], styles, true), fetched, true).join('\n')];
                            }
                        });
                    }); })];
            case 4:
                cssText = _a.sent();
                return [4 /*yield*/, browser.close()];
            case 5:
                _a.sent();
                return [2 /*return*/, cssText];
        }
    });
}); };
exports.extractCssFromUrl = extractCssFromUrl;
function parseCss(cssText) {
    var _a, _b, _c, _d, _e, _f, _g;
    // @ts-ignore: No types for 'css' package
    var ast = css.parse(cssText);
    var categories = {
        colors: new Set(),
        backgrounds: new Set(),
        fontSizes: new Set(),
        lineHeights: new Set(),
        spacings: new Set(),
        borderRadiuses: new Set(),
        shadows: new Set(),
    };
    if (ast.stylesheet && ast.stylesheet.rules) {
        for (var _i = 0, _h = ast.stylesheet.rules; _i < _h.length; _i++) {
            var rule = _h[_i];
            if (rule.type !== 'rule' || !rule.declarations)
                continue;
            for (var _j = 0, _k = rule.declarations; _j < _k.length; _j++) {
                var decl = _k[_j];
                if (decl.type !== 'declaration' || !decl.property || !decl.value)
                    continue;
                var prop = decl.property;
                var val = decl.value;
                if (/^font-size$/.test(prop))
                    categories.fontSizes.add(val);
                else if (/^line-height$/.test(prop))
                    categories.lineHeights.add(val);
                else if (/margin|padding/.test(prop))
                    categories.spacings.add(val);
                else if (/border-radius/.test(prop))
                    categories.borderRadiuses.add(val);
                else if (/box-shadow/.test(prop))
                    categories.shadows.add(val);
                else if (/^background(-color)?/.test(prop))
                    categories.backgrounds.add(val);
                else if (/color/.test(prop))
                    categories.colors.add(val);
            }
        }
    }
    // Convert Sets to Arrays
    var entries = Object.entries(categories).map(function (_a) {
        var k = _a[0], set = _a[1];
        return [k, Array.from(set)];
    });
    var result = Object.fromEntries(entries);
    return {
        colors: (_a = result.colors) !== null && _a !== void 0 ? _a : [],
        backgrounds: (_b = result.backgrounds) !== null && _b !== void 0 ? _b : [],
        fontSizes: (_c = result.fontSizes) !== null && _c !== void 0 ? _c : [],
        lineHeights: (_d = result.lineHeights) !== null && _d !== void 0 ? _d : [],
        spacings: (_e = result.spacings) !== null && _e !== void 0 ? _e : [],
        borderRadiuses: (_f = result.borderRadiuses) !== null && _f !== void 0 ? _f : [],
        shadows: (_g = result.shadows) !== null && _g !== void 0 ? _g : [],
    };
}
// Use OpenAI to map grouped values into CSS custom properties
function generateTokensWithAI(groups) {
    return __awaiter(this, void 0, void 0, function () {
        var systemMessage, userPrompt, OpenAI, client, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    systemMessage = "You are a **Brand Theming Assistant AI**. Your role is to generate a theme configuration for a web component library based on the design tokens provided in `@cre8_dev/cre8-design-tokens`. You will be given groups of raw CSS values (colors, font sizes, spacings, etc.) and you must output a CSS file containing a :root block with CSS custom properties using these tokens and ONLY these tokens.";
                    userPrompt = "Extracted values:\n" +
                        "Colors: ".concat(groups.colors.join(', '), "\n") +
                        "Backgrounds: ".concat(groups.backgrounds.join(', '), "\n") +
                        "Font sizes: ".concat(groups.fontSizes.join(', '), "\n") +
                        "Line heights: ".concat(groups.lineHeights.join(', '), "\n") +
                        "Spacings: ".concat(groups.spacings.join(', '), "\n") +
                        "Border radiuses: ".concat(groups.borderRadiuses.join(', '), "\n") +
                        "Shadows: ".concat(groups.shadows.join(', '), "\n\n") +
                        "Please map each category to the appropriate CSS custom properties as defined in `@cre8_dev/cre8-design-tokens` and return a complete CSS snippet.";
                    if (!process.env.OPENAI_API_KEY) {
                        console.error('Error: OPENAI_API_KEY environment variable is not set.');
                        process.exit(1);
                    }
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('openai'); })];
                case 1:
                    OpenAI = (_a.sent()).OpenAI;
                    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
                    return [4 /*yield*/, client.chat.completions.create({
                            model: 'gpt-4o-mini',
                            messages: [
                                { role: 'system', content: systemMessage },
                                { role: 'user', content: userPrompt }
                            ]
                        })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.choices[0].message.content];
            }
        });
    });
}
// Main execution
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, cssText, groups, tokensCss, outputPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = process.argv[2];
                if (!url) {
                    console.error('Usage: node extract-tokens.ts <url>');
                    process.exit(1);
                }
                console.log("Extracting CSS from: ".concat(url));
                return [4 /*yield*/, (0, exports.extractCssFromUrl)(url)];
            case 1:
                cssText = _a.sent();
                console.log('Parsing and categorizing CSS values...');
                groups = parseCss(cssText);
                console.log('Generating token file via AI...');
                return [4 /*yield*/, generateTokensWithAI(groups)];
            case 2:
                tokensCss = _a.sent();
                outputPath = path.resolve(process.cwd(), 'tokens.css');
                return [4 /*yield*/, fs.writeFile(outputPath, tokensCss, 'utf-8')];
            case 3:
                _a.sent();
                console.log("Tokens file written to ".concat(outputPath));
                return [2 /*return*/];
        }
    });
}); })();
// If you add this file as 'css.d.ts' in the same directory or in a types directory, it will suppress the error.
// declare module 'css'; 
