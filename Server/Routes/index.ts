import express from 'express';
const router = express.Router();


import { DisplayMovieList } from '../Controllers/movie';

/* GET home page. */
//Display some Data

router.get('/', function(req, res, next) { DisplayMovieList(req,res,next); } );

export default router;