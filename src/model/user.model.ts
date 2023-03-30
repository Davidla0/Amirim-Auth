import {
    getModelForClass,
    modelOptions,
    prop,
    Severity,
    pre,
    DocumentType,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2 from "argon2";
import log from "../utils/logger";

export const privateFields = [
 "password",
 "__v",
]

@pre<User>("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const hash = await argon2.hash(this.password);
    
    this.password = hash;

    return;
})

@modelOptions({
    schemaOptions: {
        timestamps: true,
        // bufferCommands: false,
        // autoCreate: false // disable `autoCreate` since `bufferCommands` is false 
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

export class User {
    @prop({ type: () => String, lowercase: true, required: true, unique: true })
    email: string;

    @prop({type: () => String, required: true })
    password: string;

    async validatePassword(this: DocumentType<User>, candidatePassword: string) {
        try {
            return await argon2.verify(this.password, candidatePassword);
        } catch (e) {
            log.error(e, "Could not validate password");
            return false;
        }
    }
}

const UserModel = getModelForClass(User);

export default UserModel;