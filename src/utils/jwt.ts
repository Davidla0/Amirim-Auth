import jwt from 'jsonwebtoken'
import config from 'config'

export function signJwt(
object: Object,
keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
option?: jwt.SignOptions | undefined
){
    
    const signingKey = config.get<string>(keyName)

    return jwt.sign(object, signingKey)
}

export function verifyJwt<T>(
    token: string,
    keyName: 'accessTokenPrivateKey' | 'accessTokenPublicKey',
): T | null{

    const publicKey = config.get<string>(keyName)

    try {
        const decoded = jwt.verify(token, publicKey) as T
        return decoded
    } catch (error) {
        return null 
    }
}