const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// Ruta GET para mostrar el formulario de creación de películas
router.get('/create', (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('movies/new-movie', { celebrities });
    })
    .catch((error) => {
      res.render('movies/new-movie', { error });
    });
});

// Ruta POST para recibir los datos del formulario y crear una nueva película
router.post('/create', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  const newMovie = new Movie({ title, genre, plot, cast });

  newMovie.save()
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      res.render('/movies', { error });
    });
});

// Ruta GET para mostrar todas las películas
router.get('/', (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/movies', { movies });
    })
    .catch((error) => {
      res.render('movies/movies', { error });
    });
});

// Ruta GET para mostrar los detalles de una película específica
router.get('/:id', (req, res) => {
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
router.post('/:id/delete', (req, res) => {
    const movieId = req.params.id;
  
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect('/movies');
      })
      .catch(() => {
        res.status(500).send('An error occurred');
      });
  });

  // Ruta GET para mostrar el formulario de edición de una película
router.get('/:id/edit', (req, res) => {
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
      .catch(() => {
        res.redirect('/movies');
      });
  });
  
  // Ruta POST para actualizar los datos de una película
  router.post('/:id/edit', (req, res) => {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
  
    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
      .then(() => {
        res.redirect(`/${movieId}`);
      })
      .catch(() => {
        res.redirect('/movies');
      });
  });

module.exports = router;