import {object, string, TypeOf} from "zod"


export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "email is required "
        }).email("Not a valid email or password"),
        password: string({
            required_error: "password is required "
        }).min(6, 'Not a valid email or password'),
    })
})

export type createSessionInput = TypeOf<typeof createSessionSchema>['body']