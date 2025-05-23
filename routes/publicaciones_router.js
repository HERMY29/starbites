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
const [rows] = await db.execute('SELECT id_publicacion, titulo, calificacion, autor, categoria, descripcion, imagen FROM publicaciones');

const publicaciones = rows.map(pub => ({
  ...pub,
  imagen: pub.imagen ? Buffer.from(pub.imagen).toString('base64') : null
}));

res.json(publicaciones);

  } catch (error) {
    console.error('Error al obtener títulos:', error);
    res.status(500).json({ message: 'Error al obtener los títulos' });
  }
});

    
router.put('/:id', upload.single('imagen'), async (req, res) => {
const { titulo, descripcion, autor, categoria, calificacion, tipo, estado } = req.body;

  const { id } = req.params;
  const imagen = req.file ? req.file.buffer : null;

  try {
const sql = imagen
  ? 'UPDATE publicaciones SET titulo=?, descripcion=?, autor=?, categoria=?, calificacion=?, tipo=?, estado=?, imagen=? WHERE id_publicacion=?'
  : 'UPDATE publicaciones SET titulo=?, descripcion=?, autor=?, categoria=?, calificacion=?, tipo=?, estado=? WHERE id_publicacion=?';

const params = imagen
  ? [titulo, descripcion, autor, categoria, calificacion, tipo, estado, imagen, id]
  : [titulo, descripcion, autor, categoria, calificacion, tipo, estado, id];


    await db.execute(sql, params);

    res.json({ message: 'Publicación actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar publicación:', error);
    res.status(500).json({ message: 'Error al actualizar publicación' });
  }
});

router.get('/tipo/:tipo', async (req, res) => {
  const tipo = req.params.tipo;

  try {
    const [rows] = await db.execute(`
      SELECT id_publicacion, titulo, descripcion, calificacion, imagen, tipo
      FROM publicaciones
      WHERE tipo = ? AND estado = 'publicada'
    `, [tipo]);

    const publicaciones = rows.map(pub => ({
      ...pub,
      imagen: pub.imagen ? Buffer.from(pub.imagen).toString('base64') : null
    }));

    res.json(publicaciones);
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    res.status(500).json({ message: "Error al obtener publicaciones" });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await db.execute(`
      SELECT titulo, descripcion, autor, calificacion, categoria, imagen 
      FROM publicaciones 
      WHERE id_publicacion = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    const pub = rows[0];
    pub.imagen = pub.imagen ? Buffer.from(pub.imagen).toString('base64') : null;

    res.json(pub);
  } catch (error) {
    console.error("Error al obtener publicación:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});


module.exports = router;
