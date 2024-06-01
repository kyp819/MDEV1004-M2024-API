//movie controller logic goes here
import { Request,Response,NextFunction } from "express";

import Movie from "../Models/movie";
/**
 *This Function displays the movie list in json format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieList(req: Request, res:Response,next: NextFunction):void{
    Movie.find({})
    .then((data) =>
    {
        res.status(200).json({success: true, msg:"Movie list retrived and Displayed",data: data})
    })
    .catch((err)=>
    {
        console.error(err)
    })
}