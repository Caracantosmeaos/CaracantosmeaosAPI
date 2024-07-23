import {Router} from "express"
import { getAllMatches, getMatchById, getAllMatchesOrdered, getMatchesByTypeOrdered } from "@controllers/match.controller"

const router:Router = Router()

router.get("/", getAllMatches)

router.get("/ordered", getAllMatchesOrdered)
router.get("/ordered/:type", getMatchesByTypeOrdered)

router.get("/:id", getMatchById)

export default router