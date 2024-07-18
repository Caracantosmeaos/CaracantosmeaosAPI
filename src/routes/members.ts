import  { TPlatformType } from '../../ProClubsAPI'
import { Router, Request, Response } from 'express';
import { IClubMemberStats } from '../../ProClubsAPI/dist/model/club';
import { getClubMembers } from '../../ProClubsAPI';

const CLUBID:number = Number(process.env.CLUBID || '290776');
const PLATFORM:string = String(process.env.PLATFORM || 'common-gen5')

const router = Router()

async function formatResponse(response: IClubMemberStats[]|undefined){
    if(response!=null && response!=undefined){
        return {"status": 200, "response": response};
    }else return {"status": 400};
}

router.get("/", async function (req: Request, res: Response){
    const resp = await getClubMembers(<TPlatformType>PLATFORM, CLUBID);
    const respFormated = await formatResponse(resp);

    res.send(respFormated);
});

export default router;