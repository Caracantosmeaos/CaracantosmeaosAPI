import {getById, 
    getLatestByMatchTypeLimit, 
    getLatestLimit, getAll} from "@services/match.service"
import { NextFunction, Request, Response } from "express"

async function getAllMatches(req: Request, res: Response, next: NextFunction){
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
        next(new Error("ERROR_GETTING_MATCHES"))
    }
}

async function getAllMatchesOrdered(req: Request, res: Response, next: NextFunction){
    try{
        const limitFilter:number = Number(req.query.limit)
        const response =  await getLatestLimit(limitFilter)
        res.json({
            status:{
                code: 200,
                message: "Ok"
            },
            response: response
        })
    }catch(err){
        console.error(err)
        next(new Error("ERROR_GETTING_MATCHES"))
    }
}

async function getMatchesByTypeOrdered(req: Request, res: Response, next: NextFunction){
    try{
        const limitFilter:number = Number(req.query.limit)
        const type:"league"|"playoff" = <"league"|"playoff">(req.params.type) ?? next(new Error("ERROR_BAD_REQUEST"))
        const response =  await getLatestByMatchTypeLimit(type, limitFilter)
        res.json({
            status:{
                code: 200,
                message: "Ok"
            },
            response: response
        })
    }catch(err){
        console.error(err)
        next(new Error("ERROR_GETTING_MATCHES"))
    }
}

async function getMatchById(req: Request, res: Response, next: NextFunction){
    try{
        const id = Number(req.params.id) ?? next(new Error("ERROR_BAD_REQUEST"))
        const response = await getById(id) ?? next(new Error("ERROR_NOT_FOUND"))
        res.json({
            status:{
                code: 200,
                message: "Ok"
            },
            response: response
        })
    }catch(err){
        console.error(err)
        next(new Error("ERROR_GETTING_MATCHES"))
    }
}

export {getAllMatches, getAllMatchesOrdered, getMatchById, getMatchesByTypeOrdered}