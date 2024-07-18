const proClubsApi = require('../proclubs-api')

var express = require('express');
var router = express.Router();


async function formatResponse(response){
    if(response!=null && response!=undefined){
        return {"status": 200, "response": response};
    }else return {"status": 400};
}


router.get("/", async function (req, res){
    const clubid = req.clubid;
    const platform = req.platform;
    const resp = await proClubsApi.getClubMembers(platform, clubid);
    const respFormated = await formatResponse(resp);
    /*const respstats = await proClubsApi.getClubMemberStats("common-gen5", clubid);
    if(respFormated.response!=null){
        for (var i=0; i< respstats.length; i++){
            var avgRating = respstats[i].ratingAve;
            console.log(avgRating);
            respFormated.response[i].avgRating = avgRating;
        }
    }*/
    res.send(respFormated);
});

module.exports = router;