import { ILegacyTokenUser, ILoginResponse, IRefreshTokenDTO } from "../../models/auth.interface";


export const payloadFromToken = (token:string)=>{
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
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