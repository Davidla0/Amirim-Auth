import { createUserSchema } from './../schema/user.schema';
import express from 'express'
import validateResource from '../middleware/validateResource.middleware'
import { createUserHandler } from '../api/user/user.controller';
import { getCurrentUserHandler } from '../api/auth/auth.controller';
import requireUser from '../middleware/requireUser';

const router = express.Router()

router.post("/api/users", validateResource(createUserSchema), createUserHandler)

router.get("/api/users/me", requireUser, getCurrentUserHandler);

export default router
