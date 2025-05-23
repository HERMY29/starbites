const express = require('express');
const { createMovie,getMovieById,getMovies,getMovieByName,updateMovie,deleteMovie } = require('../controller/movie_controller');

const router = express.Router();


router.post('/create',  createMovie);
router.get('/getMovie/:id_pelicula', getMovieById);
router.get('/getMovies', getMovies);
router.get('/getMovieByName', getMovieByName);
router.put('/updateMovie/:id_pelicula', updateMovie);
router.delete('/deleteMovie/:id_pelicula', deleteMovie);



module.exports = router;