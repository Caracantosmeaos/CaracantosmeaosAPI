import { TPlatformType } from '../../ProClubsAPI'
import { Router, Request, Response } from 'express';
import { IClubInfo, IClubMatches, IClubStats, TGametype } from '../../ProClubsAPI/dist/model/club';
import { getClubMatchHistory, getClubStats, getClubInfo } from '../../ProClubsAPI';

const CLUBID:number = Number(process.env.CLUBID || '290776');
const PLATFORM:string = String(process.env.PLATFORM || 'common-gen5')

const router = Router()

async function formatResponse(response: IClubMatches[]|IClubInfo|IClubStats|undefined){
    if(response!=null && response!=undefined){
        return {"status": 200, "response": response};
    }else return {"status": 400};
}

/* 
    Devuelve listado de ultimos partidos con muchos datos
    @type: (optional) league/playoff. Default: league

*/
router.get("/matchHistory/:type?", async function (req: Request, res: Response){
    var gameType: TGametype = "leagueMatch";
    var t = req.params.type
    if(t){
        if(t.toString().toLocaleLowerCase() == "league") gameType = "leagueMatch";
        else if(t.toString().toLocaleLowerCase() == "playoff") gameType = "playoffMatch"
    }
    const resp = await getClubMatchHistory(<TPlatformType>PLATFORM, CLUBID, gameType);
    const respFormated = await formatResponse(resp);
    res.send(respFormated);
});

router.get("/stats", async function (req: Request, res: Response){
    const resp = await getClubStats(<TPlatformType>PLATFORM, CLUBID);
    const respFormated = await formatResponse(resp);
    res.send(respFormated);
});

router.get("/info", async function (req: Request, res: Response){
    const resp = await getClubInfo(<TPlatformType>PLATFORM, CLUBID);
    const respFormated = await formatResponse(resp);
    res.send(respFormated);
});

export default router;