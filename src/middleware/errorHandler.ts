import { NextFunction, Request, Response } from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    console.error(err.stack)
    var statusCode:number = err.message.toString()==="ERROR_NOT_FOUND" ? 404 : 500
    if(err.message.toString()==="ERROR_BAD_REQUEST") statusCode = 400
    res.status(statusCode).json({
        status:{
            code: statusCode,
            message: err.message
        }
    })
}

export default errorHandler