const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controller/publicaciones_controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('imagen'), controller.crearPublicacion);

const db = require('../db');

router.get('/titulos', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id_publicacion, titulo, calificacion, autor, categoria, descripcion FROM publicaciones');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener títulos:', error);
    res.status(500).json({ message: 'Error al obtener los títulos' });
  }
});

    

module.exports = router;
