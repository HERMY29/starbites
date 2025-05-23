const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controller/publicaciones_controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('imagen'), controller.crearPublicacion);

module.exports = router;
