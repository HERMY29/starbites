const db = require('../db');

exports.crearPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, tags } = req.body;
    const imagen = req.file ? req.file.buffer : null;

    const [result] = await db.execute(`
      INSERT INTO publicaciones (tipo, titulo, descripcion, autor, calificacion, imagen, categoria, estado, id_usuario)
      VALUES ('pelicula', ?, ?, 'Admin', 0, ?, ?, 'publicada', 1)
    `, [titulo, descripcion, imagen, categoria]);

    res.status(201).json({ message: 'Publicación creada', id: result.insertId });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
