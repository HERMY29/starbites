const express = require('express');
const router = express.Router();

const controller = require('../controller/peticion_controller');

router.get('/peticiones', controller.obtenerPeticiones);

// Actualizar estado de una petición (aceptar o rechazar)
router.post('/peticiones/:id/estado', controller.actualizarEstadoPeticion);

//crear peticion

router.post('/peticiones', controller.crearPeticion);


module.exports = router;