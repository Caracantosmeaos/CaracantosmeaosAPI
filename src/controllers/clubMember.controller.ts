import {getByName, getAll} from "@services/clubMember.service"
import { NextFunction, Request, Response } from "express"

async function getAllMembers(req: Request, res: Response, next: NextFunction){
    try{
        const response = await getAll()
        res.json({
            status:{
                code: 200,
                message: "Ok"
            },
            response: response
        })
    }catch(err){
        console.error(err)
        next(new Error("ERROR_GETTING_MEMBERS"))
    }
}

async function getMemberByName(req: Request, res: Response, next: NextFunction){
    try{
        const playername = String(req.params.playername) ?? next(new Error("ERROR_BAD_REQUEST"))
        const response = await getByName(playername) ?? next(new Error("ERROR_NOT_FOUND"))
        res.json({
            status:{
                code: 200,
                message: "Ok"
            },
            response: response
        })
    }catch(err){
        console.error(err)
        next(new Error("ERROR_GETTING_MEMBER"))
    }
}

export {getAllMembers, getMemberByName}