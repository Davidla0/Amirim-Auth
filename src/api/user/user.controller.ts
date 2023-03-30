import { Request, Response } from "express";
import { createUserInput } from "../../schema/user.schema";
import {createUser}  from "./user.service";

export async function createUserHandler(req: Request<{}, {}, createUserInput>, res: Response){
    const body = req.body

    try {
        const user = await createUser(body)
        res.send('User successfully added')
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).send('Account already exist')
        }

        return res.status(500).send(e)
    }
}