//https://gitlab.com/firstTerraner/proclubs-api.git
//https://firstterraner.gitlab.io/proclubs-api/
//const CLUBID = 290776;

const config = require('./config')
var express = require("express");
var bodyparser = require("body-parser");
var cors = require('cors');
var app = express();


const setParams = function (req, res, next) {
    req.clubid = config.CLUBID;
    req.platform = config.PLATFORM
    next();
  }

app.use(setParams);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

if(config.DEVMODE){
    app.use(cors());
}else{
    app.use(cors({
        origin: 'https://www.caracantosmeaos.club'
    }));
}


/* RUTAS */
var clubRouter = require("./routes/club");
var membersRouter = require("./routes/members");
app.use("/club",clubRouter);
app.use("/members",membersRouter);

/*INDEX*/
app.get("/", async function (req, res){
    res.send({
        "routes":[
            {"/club":[
                {"/info": "Club info"},
                {"/stats": "Club stats"},
                {"/matchHistory/{type}": "Club match history (max 10 last macthes). Types: 'league' / 'playoff'. Default: league"}
            ]
            },
            {
                "/members":[
                    {"/": "List of club members and respective stats"}
                ]
            }
        ]
    });
});

var port = 80
app.set('trust proxy', true);
app.listen(port, '0.0.0.0');
console.log("Listening on port "+port);