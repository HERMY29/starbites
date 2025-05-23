
// Crear una película
exports.createMovie = async (req, res) => {
    const { nombre, descripcion, calificacion, miniatura, id_categoria } = req.body;
  
    try {  
      console.log('Película creada:', { nombre, descripcion, calificacion, miniatura, id_categoria });
      res.status(201).json({ message: 'Película creada con éxito' });
    } catch (error) {
      console.error('Error al crear la película:', error);
      res.status(500).json({ message: 'Hubo un error al crear la película', error: error.message });
    }
    
  };

  // Obtener una película por ID
exports.getMovieById = async (req, res) => {
    const { id_pelicula } = req.params;
  
    try {
      console.log("Obteniendo película con ID:", id_pelicula);
      res.json({ message: 'Película obtenida con éxito', id_pelicula });
    } catch (error) {
      console.error('Error al obtener la película:', error);
      res.status(500).json({ message: 'Error al obtener la película', error: error.message });
    }
  };

  // Obtener todas las películas
exports.getMovies = async (req, res) => {
    const { estado } = req.query;
    try {
      console.log("Obteniendo películas con estado:", estado);
      res.json({ message: 'Películas obtenidas con éxito', estado });
    } catch (error) {
      console.error('Error al obtener las películas:', error);
      res.status(500).json({ message: 'Error al obtener las películas', error: error.message });
    }
  };
  
  // Obtener películas por nombre
  exports.getMovieByName = async (req, res) => {
    const { nombre } = req.query;
  
    console.log(`Iniciando búsqueda de película por nombre: "${nombre}"`);
  
    try {
      console.log(`Se encontraron películas con el nombre "${nombre}"`);
      res.json({ message: 'Películas encontradas con éxito', nombre });
    } catch (error) {
      console.error(`Error al buscar las películas por nombre "${nombre}":`, error);
      res.status(500).json({ message: 'Error al buscar las películas', error: error.message });
    }
  };
  
  // Editar una película
  exports.updateMovie = async (req, res) => {
    const { id_pelicula } = req.params;
    const { nombre, descripcion, calificacion, miniatura, id_categoria } = req.body;
  
    try {
      if (!nombre || !descripcion || !calificacion || !miniatura || !id_categoria) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      }
  
      if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
        return res.status(400).json({ message: 'La calificación debe ser un número entre 0 y 10.' });
      }
  
      console.log('Película actualizada:', { id_pelicula, nombre, descripcion, calificacion, miniatura, id_categoria });
      res.json({ message: 'Película actualizada con éxito', id_pelicula });
    } catch (error) {
      console.error('Error al actualizar la película:', error);
      res.status(500).json({ message: 'Hubo un error al actualizar la película', error: error.message });
    }
  };

  //Eliminar pelicula
  exports.deleteMovie = async (req, res) => {
    const { id_pelicula } = req.params;

    try {
        console.log(`Eliminando película con ID: ${id_pelicula}`);
        res.json({ message: 'Película eliminada con éxito', id_pelicula });
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        res.status(500).json({ message: 'Error al eliminar la película', error: error.message });
    }
};
