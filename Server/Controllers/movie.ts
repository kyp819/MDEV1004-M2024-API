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

export function DislayMovieById(req:Request,res:Response,next:NextFunction)
{
    //endpoint should be /movie/display/id
    let id = req.params.id;

    Movie.findById({_id:id})
    .then((data)=>
    {
        res.status(200).json({success: true,msg: "Movie retrived and displayed",data:data})
    })
    .catch((err)=>
    {
        console.error(err);
    })

}