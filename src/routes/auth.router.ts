import { createSessionSchema } from './../schema/auth.schema';
import express from 'express'
import { createSessionHandler } from '../api/auth/auth.controller'
import validateResource from '../middleware/validateResource.middleware'

const router = express.Router()

router.post("/api/session", validateResource(createSessionSchema), createSessionHandler)

export default router