// Crear un libro
exports.createBook = async (req, res) => {
    const { titulo, autor, descripcion, calificacion, portada, id_categoria } = req.body;
  
    try {  
      console.log('Libro creado:', { titulo, autor, descripcion, calificacion, portada, id_categoria });
      res.status(201).json({ message: 'Libro creado con éxito' });
    } catch (error) {
      console.error('Error al crear el libro:', error);
      res.status(500).json({ message: 'Hubo un error al crear el libro', error: error.message });
    }
};

// Obtener un libro por ID
exports.getBookById = async (req, res) => {
    const { id_libro } = req.params;
  
    try {
      console.log("Obteniendo libro con ID:", id_libro);
      res.json({ message: 'Libro obtenido con éxito', id_libro });
    } catch (error) {
      console.error('Error al obtener el libro:', error);
      res.status(500).json({ message: 'Error al obtener el libro', error: error.message });
    }
};

// Obtener todos los libros
exports.getBooks = async (req, res) => {
    const { estado } = req.query;
    try {
      console.log("Obteniendo libros con estado:", estado);
      res.json({ message: 'Libros obtenidos con éxito', estado });
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      res.status(500).json({ message: 'Error al obtener los libros', error: error.message });
    }
};

// Obtener libros por nombre
exports.getBookByName = async (req, res) => {
    const { titulo } = req.query;
  
    console.log(`Iniciando búsqueda de libro por título: "${titulo}"`);
  
    try {
      console.log(`Se encontraron libros con el título "${titulo}"`);
      res.json({ message: 'Libros encontrados con éxito', titulo });
    } catch (error) {
      console.error(`Error al buscar los libros por título "${titulo}":`, error);
      res.status(500).json({ message: 'Error al buscar los libros', error: error.message });
    }
};

// Editar un libro
exports.updateBook = async (req, res) => {
    const { id_libro } = req.params;
    const { titulo, autor, descripcion, calificacion, portada, id_categoria } = req.body;
  
    try {
      if (!titulo || !autor || !descripcion || !calificacion || !portada || !id_categoria) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      }
  
      if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
        return res.status(400).json({ message: 'La calificación debe ser un número entre 0 y 10.' });
      }
  
      console.log('Libro actualizado:', { id_libro, titulo, autor, descripcion, calificacion, portada, id_categoria });
      res.json({ message: 'Libro actualizado con éxito', id_libro });
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
      res.status(500).json({ message: 'Hubo un error al actualizar el libro', error: error.message });
    }
};
//Eliminar libros
exports.deleteBook = async (req, res) => {
  const { id_libro } = req.params;

  try {
      console.log(`Eliminando libro con ID: ${id_libro}`);
      res.json({ message: 'Libro eliminado con éxito', id_libro });
  } catch (error) {
      console.error('Error al eliminar el libro:', error);
      res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
  }
};
