"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.script = script;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function script() {
    const res = await (0, node_fetch_1.default)("https://raw.githubusercontent.com/nodejs/release/main/schedule.json");
    if (!res.ok) {
        throw new Error(`HTTP Error Response: ${res.status} ${res.statusText} ${await res.text()}`);
    }
    const json = (await res.json());
    const now = new Date();
    const supportedVersions = [];
    for (const version in json) {
        const { lts, end } = json[version];
        if (lts !== undefined &&
            new Date(lts + "T00:00:00Z") <= now &&
            now < new Date(end + "T00:00:00Z")) {
            supportedVersions.push(Number(version.replace(/^v/, "")));
        }
    }
    return supportedVersions;
}
