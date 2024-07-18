const proClubsApi = require('../proclubs-api')

var express = require('express');
var router = express.Router();


async function formatResponse(response){
    if(response!=null && response!=undefined){
        return {"status": 200, "response": response};
    }else return {"status": 400};
}

/* 
    Devuelve listado de ultimos partidos con muchos datos
    @type: (optional) league/coup. Default: league

*/
router.get("/matchHistory/:type?", async function (req, res){
    const clubid = req.clubid;
    const platform = req.platform;
    var gameType = "leagueMatch";
    var t = req.params.type
    if(t){
        if(t.toString().toLocaleLowerCase() == "league") gameType = "leagueMatch";
        else if(t.toString().toLocaleLowerCase() == "playoff") gameType = "playoffMatch"
    }
    const resp = await proClubsApi.getClubMatchHistory(platform, clubid, gameType);
    const respFormated = await formatResponse(resp);
    res.send(respFormated);
});

router.get("/stats", async function (req, res){
    const clubid = req.clubid;
    const platform = req.platform;
    const resp = await proClubsApi.getClubStats(platform, clubid);
    const respFormated = await formatResponse(resp);
    res.send(respFormated);
});

router.get("/info", async function (req, res){
    const clubid = req.clubid;
    const platform = req.platform;
    const resp = await proClubsApi.getClubInfo(platform, clubid);
    const respFormated = await formatResponse(resp);
    res.send(respFormated);
});

module.exports = router;