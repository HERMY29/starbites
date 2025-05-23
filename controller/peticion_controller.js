const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db'); 


// Obtener peticiones
exports.obtenerPeticiones = async (req, res) => {
  const estado = req.query.estado; // lee query param ?estado=

  let query = `
    SELECT p.id_peticion, u.nombre AS usuario, p.tipo, p.titulo, p.mensaje, p.estado
    FROM peticion p
    JOIN usuario u ON p.id_usuario = u.id
  `;

  if (estado) {
    query += ` WHERE p.estado = ? ORDER BY p.fecha_peticion DESC`;
  } else {
    query += ` ORDER BY p.fecha_peticion DESC`;
  }

  try {
    const [results] = estado
      ? await db.query(query, [estado])
      : await db.query(query);
    res.json(results);
  } catch (err) {
    console.error('Error al obtener las peticiones:', err);
    res.status(500).json({ error: 'Error al obtener las peticiones' });
  }
};

// Actualizar estado
exports.actualizarEstadoPeticion = async (req, res) => {
  const id = req.params.id;
  const { nuevoEstado } = req.body;

  const ESTADOS_VALIDOS = ['pendiente', 'aceptada', 'rechazada'];
  if (!ESTADOS_VALIDOS.includes(nuevoEstado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  const query = `UPDATE peticion SET estado = ? WHERE id_peticion = ?`;

  try {
    const [result] = await db.query(query, [nuevoEstado, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Petición no encontrada' });
    }

    res.json({ message: 'Estado actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar la petición:', err);
    res.status(500).json({ error: 'Error al actualizar la petición' });
  }
};

