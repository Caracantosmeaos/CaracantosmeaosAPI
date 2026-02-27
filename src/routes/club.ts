import { TPlatformType } from '../../ProClubsAPI'
import { Router, Request, Response } from 'express';
import { getClubDataCache } from '../controllers/club.controller';

const CLUBID: number = Number(process.env.CLUBID || '2766636');
const PLATFORM: string = String(process.env.PLATFORM || 'common-gen5')

const router = Router()

async function formatResponse(response: any) {
    if (response != null && response != undefined) {
        return { "status": 200, "response": response };
    } else return { "status": 400 };
}


router.get("/", async function (req: Request, res: Response) {
    const resp = await getClubDataCache(<TPlatformType>PLATFORM, CLUBID);
    const respFormated = await formatResponse(resp);
    res.send(respFormated);
});

export default router;