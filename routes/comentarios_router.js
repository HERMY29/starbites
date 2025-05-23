const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener comentarios de una publicación
router.get('/:id_publicacion', async (req, res) => {
  const { id_publicacion } = req.params;

  try {
    const [rows] = await db.execute(`
      SELECT contenido
      FROM comentarios
      WHERE id_publicacion = ?
      ORDER BY fecha DESC
    `, [id_publicacion]);

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
});


// Crear nuevo comentario
router.post('/:id_publicacion', async (req, res) => {
  const { id_publicacion } = req.params;
  const { contenido } = req.body;
  const id_usuario = 1; // ID fijo

  if (!contenido) {
    return res.status(400).json({ message: 'El contenido no puede estar vacío.' });
  }

  try {
    await db.execute(`
      INSERT INTO comentarios (id_usuario, id_publicacion, contenido)
      VALUES (?, ?, ?)
    `, [id_usuario, id_publicacion, contenido]);

    res.json({ message: 'Comentario guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar comentario:', error);
    res.status(500).json({ message: 'Error al guardar comentario' });
  }
});


module.exports = router;
