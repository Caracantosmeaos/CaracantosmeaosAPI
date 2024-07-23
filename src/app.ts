import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "src/middleware/errorHandler";
import database from "src/database/mongo"

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

/* ROUTES */
import membersRouter from './routes/members';
import clubRouter from './routes/club';
app.use("/club",clubRouter);
app.use("/members",membersRouter);

import matchesRouter from 'src/routes/matches'
app.use("/matches", matchesRouter)

/* Error middlewere after all routers */
app.use(errorHandler)

database().then(()=> {
    console.log("Connection to database: OK")
})
.catch((e)=> console.log("An error ocurred while trying to connect to database:  "+e))

/*INDEX*/
app.get("/", async function (req, res){
    res.send({
        "routes":[
            {"/club":[
                {"/info": "Club info"},
                {"/stats": "Club stats"},
            ]
            },
            {
                "/members":[
                    {"/": "List of club members and respective stats"}
                ]
            },
            {
                "/matches":[
                    {"/": "List of all matches"},
                    {"/{id}": "Get match by ID"},
                    {"/ordered?limit": "Ordered list of all matches (newer before)"},
                    {"/ordered/{type}?limit": "Ordered list of specific type of matches (newer before)"}
                ]
            }
        ]
    });
});

app.set('trust proxy', true);
app.listen(PORT, '0.0.0.0');
console.log("Listening on port "+PORT);