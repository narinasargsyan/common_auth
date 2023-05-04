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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class AuthService {
    constructor(redis) {
        this.redis = redis;
    }
    async getTokenFromRedis(key) {
        return await this.redis.getAsync(key);
    }
    async setTokenToRedis(key, payload, expiresIn) {
        this.redis.set(key, JSON.stringify(payload), "EX", expiresIn);
    }
    async signToken(payload, secretKey, expiresIn, keyName) {
        const token = await jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
        await this.setTokenToRedis(`${keyName}:${token}`, payload, expiresIn);
        return token;
    }
    async signAccessToken(payload) {
        return this.signToken(payload, process.env.ACCESS_TOKEN_SECRET, 6000, "accessToken");
    }
    async verifyToken(token, secretKey) {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    async verifyAccessToken(token) {
        return this.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    }
}
module.exports = AuthService;
//# sourceMappingURL=auth.service.js.map