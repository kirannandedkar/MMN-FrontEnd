export type AuthResult = {
    sub: string,
    accessToken: string,
    expiredAt: string,
    refreshToken: string,
    refreshTokenExpiredAt: string
}