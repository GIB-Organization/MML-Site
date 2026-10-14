import { ILegacyTokenUser, ILoginResponse, IRefreshTokenDTO } from "../../models/auth.interface";


export const payloadFromToken = (token:string)=>{
    const arrayToken = token.split('.');
    // JWT payload is base64url-encoded UTF-8; atob alone yields Latin-1 bytes (garbles Arabic)
    const base64 = arrayToken[1].replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const tokenPayload = JSON.parse(new TextDecoder('utf-8').decode(bytes));
    return tokenPayload
}

export const tokenUserAdapter = (user:ILegacyTokenUser, token:IRefreshTokenDTO):ILoginResponse=>{
    return {
        token: token,
        userId: user.nameid,
        username: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        nationalId: user.nationalId,
        iban: user.iban,
        bankName: user.bankName,
        fullName:user.fullName
    }
}