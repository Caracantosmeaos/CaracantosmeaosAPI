import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";



const app:Express = express();

const DEVMODE = process.env.DEVMODE || false
const PORT = Number(process.env.PORT || 80)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(DEVMODE){
    app.use(cors());
}else{
    app.use(cors({
        origin: 'https://www.caracantosmeaos.club'
    }));
}


/* RUTAS */
import membersRouter from './routes/members';
import clubRouter from './routes/club';
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

app.set('trust proxy', true);
app.listen(PORT, '0.0.0.0');
console.log("Listening on port "+PORT);