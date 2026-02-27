import { Router } from 'express';
import { getAllMembers, getMemberByName } from "@controllers/clubMember.controller"

const router = Router()

router.get("/:playername", getMemberByName)

router.get("/", getAllMembers)

export default router;