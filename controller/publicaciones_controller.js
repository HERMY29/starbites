const db = require('../db');

exports.crearPublicacion = async (req, res) => {
  try {
    const { tipo, titulo, descripcion, categoria, tags, calificacion, autor } = req.body;
    const imagen = req.file ? req.file.buffer : null;
    const calificacionNum = parseInt(calificacion);

    if (isNaN(calificacionNum) || calificacionNum < 1 || calificacionNum > 100) {
      return res.status(400).json({ message: 'La calificación debe ser un número entre 1 y 100.' });
    }

    const [result] = await db.execute(`
      INSERT INTO publicaciones (
        tipo, titulo, descripcion, autor, calificacion, imagen, categoria, estado, id_usuario
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'publicada', 1)
    `, [tipo, titulo, descripcion, autor, calificacionNum, imagen, categoria]);

    res.status(201).json({ message: 'Publicación creada', id: result.insertId });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
