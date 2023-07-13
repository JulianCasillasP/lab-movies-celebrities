const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// Ruta GET para mostrar el formulario de creación de películas
router.get('/movies/create', (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('movies/new-movie', { celebrities });
    })
    .catch((error) => {
      res.render('movies/new-movie', { error });
    });
});

// Ruta POST para recibir los datos del formulario y crear una nueva película
router.post('/movies/create', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  const newMovie = new Movie({ title, genre, plot, cast });

  newMovie.save()
    .then(() => {
      res.redirect('movies/movies');
    })
    .catch((error) => {
      res.render('movies/new-movie', { error });
    });
});

// Ruta GET para mostrar todas las películas
router.get('/movies', (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/movies', { movies });
    })
    .catch((error) => {
      res.render('movies/movies', { error });
    });
});

// Ruta GET para mostrar los detalles de una película específica
router.get('/movies/:id', (req, res) => {
    const movieId = req.params.id;
  
    Movie.findById(movieId)
      .populate('cast')
      .then((movie) => {
        res.render('movies/movie-details', { movie });
      })
      .catch((error) => {
        res.render('movies/movie-details', { error });
      });
  });

  // Ruta POST para eliminar una película específica
router.post('/movies/:id/delete', (req, res) => {
    const movieId = req.params.id;
  
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect('movies/movies');
      })
      .catch((error) => {
        res.status(500).send('An error occurred');
      });
  });

  // Ruta GET para mostrar el formulario de edición de una película
router.get('/movies/:id/edit', (req, res) => {
    const movieId = req.params.id;
  
    Movie.findById(movieId)
      .then((movie) => {
        Celebrity.find()
          .then((celebrities) => {
            res.render('movies/edit-movie', { movie, celebrities });
          })
          .catch((error) => {
            res.render('movies/edit-movie', { error });
          });
      })
      .catch((error) => {
        res.redirect('movies/movies');
      });
  });
  
  // Ruta POST para actualizar los datos de una película
  router.post('/movies/:id/edit', (req, res) => {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
  
    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
      .then(() => {
        res.redirect(`movies/${movieId}`);
      })
      .catch((error) => {
        res.redirect('movies/movies');
      });
  });

module.exports = router;