const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');

// Ruta GET para mostrar todas las celebridades
router.get('/celebrities', (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/celebrities', { celebrities });
    })
    .catch((error) => {
      res.render('celebrities/celebrities', { error });
    });
});

// Ruta GET para mostrar el formulario de creación de celebridades
router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/new-celebrity');
});

// Ruta POST para recibir los datos del formulario y crear una nueva celebridad
router.post('/celebrities/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });

  newCelebrity.save()
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.render('celebrities/new-celebrity', { error });
    });
});

module.exports = router;
