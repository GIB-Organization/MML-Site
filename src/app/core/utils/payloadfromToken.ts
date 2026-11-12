import { decodeJwt } from "./jwt";
import { ILegacyTokenUser, ILoginResponse, IRefreshTokenDTO } from "../../models/auth.interface";


/** The claims of a readable token, or an empty object for anything else; never throws (VULN-071, see jwt.ts). */
export const payloadFromToken = (token: unknown): Partial<ILegacyTokenUser> => (decodeJwt(token) ?? {}) as Partial<ILegacyTokenUser>;

export const tokenUserAdapter = (user:Partial<ILegacyTokenUser>, token:IRefreshTokenDTO):ILoginResponse=>{
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