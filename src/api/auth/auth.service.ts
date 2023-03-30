import { privateFields, User } from './../../model/user.model';
import { DocumentType } from '@typegoose/typegoose';
import { signJwt } from '../../utils/jwt';
import SessionModel from '../../model/session.model';
import {omit} from "lodash"

export async function createSession({ userId }: { userId: string }) {
    return SessionModel.create({ user: userId });
}

export function signAccessToken(user: DocumentType<User>) {

    const payload = omit(user.toJSON(), privateFields)

    const accessToken = signJwt(payload, 'accessTokenPrivateKey')

    return accessToken
}