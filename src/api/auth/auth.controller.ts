import { createSessionInput } from './../../schema/auth.schema';
import { Request, Response } from "express";
import { findUserByEmail } from "../user/user.service"
import { signAccessToken } from './auth.service';

export async function createSessionHandler(
    req: Request<{}, {}, createSessionInput>,
    res: Response) 
{
    const message = "Invalid email or password"
    const {email, password} = req.body
    
    const user = await findUserByEmail(email)
    
    if(!user){
        return res.send(message)
    }

    const isValid = await user.validatePassword(password)

    if(!isValid){
        return res.send(message)
    }

    //sign access token
    const accessToken = signAccessToken(user)

    res.cookie('token', accessToken, {maxAge: 604800000})
    return res.send({
        accessToken,
      });
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user);
  }