import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

class AuthService {
  public redis: any;
 constructor(redis) {
   this.redis = redis
 }
  async getTokenFromRedis(key: string) {
    return await this.redis.getAsync(key);
  }

  async setTokenToRedis(key: string, payload: any, expiresIn: number) {
    this.redis.set(key, JSON.stringify(payload), "EX", expiresIn);
  }

  async signToken(payload: any, secretKey: string, expiresIn: number, keyName: string) {
    const token = await jwt.sign(payload, secretKey, { expiresIn });
    await this.setTokenToRedis(`${keyName}:${token}`, payload, expiresIn);
    return token;
  }

  async signAccessToken(payload: any) {
    return this.signToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      6000,
      "accessToken"
    );
  }

  async verifyToken(token: string, secretKey: string) {
    return jwt.verify(token, secretKey);
  }

  async verifyAccessToken(token: string) {
    return this.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
  }
}

export = AuthService;
