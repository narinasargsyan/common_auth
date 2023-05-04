declare class AuthService {
    redis: any;
    constructor(redis: any);
    getTokenFromRedis(key: string): Promise<any>;
    setTokenToRedis(key: string, payload: any, expiresIn: number): Promise<void>;
    signToken(payload: any, secretKey: string, expiresIn: number, keyName: string): Promise<any>;
    signAccessToken(payload: any): Promise<any>;
    verifyToken(token: string, secretKey: string): Promise<any>;
    verifyAccessToken(token: string): Promise<any>;
}
export = AuthService;
