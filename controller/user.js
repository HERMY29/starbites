const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Registro de usuario
exports.register = async (req, res) => {
     console.log('Datos recibidos en /register:', req.body); 
  const { nombre, correo, contraseña, tipo_usuario, fecha_nacimiento, genero, telefono } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const [result] = await db.execute(
      'INSERT INTO usuario (nombre, correo, contraseña, tipo_usuario, fecha_nacimiento, genero, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, correo, hashedPassword, tipo_usuario, fecha_nacimiento, genero, telefono]
    );

    res.status(201).json({ message: 'Usuario registrado correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error en el registro' });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM usuario WHERE correo = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.contraseña);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }


    const token = jwt.sign(
      { id: user.id, email: user.correo, tipo_usuario: user.tipo_usuario },
      'secret',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      tipo_usuario: user.tipo_usuario
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error en login' });
  }
};

//Obtener Usuario por ID
exports.getUserById = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        console.log(`Obteniendo usuario con ID: ${id_usuario}`);
        res.json({ message: 'Usuario obtenido con éxito', id_usuario });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
};

//Actualizar Usuario
exports.updateUser = async (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, email, password } = req.body;

    try {
        console.log(`Actualizando usuario: ${id_usuario}`, { nombre, email });
        res.json({ message: 'Usuario actualizado con éxito', id_usuario });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Hubo un error al actualizar el usuario', error: error.message });
    }
};

// Eliminar Usuario
exports.deleteUser = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        console.log(`Eliminando usuario con ID: ${id_usuario}`);
        res.json({ message: 'Usuario eliminado con éxito', id_usuario });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
};

