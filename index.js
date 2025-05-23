const express = require('express');
const { register, login } = require('./controller/user');

const moviesRoutes= require ('./routes/movie_router');
const booksRoutes= require ('./routes/book_router');
const userRoutes= require ('./routes/user_router');


const app = express();
app.use(express.static('public'));

require('dotenv').config();

// Middleware para procesar JSON
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Ruta para registro
app.post('/register', register);

//app.post('/login', login);

app.use('/movies', moviesRoutes);
app.use('/books', booksRoutes);
app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const publicacionesRoutes = require('./routes/publicaciones_router');
app.use('/publicaciones', publicacionesRoutes);

const comentariosRouter = require('./routes/comentarios_router');
app.use('/comentarios', comentariosRouter);
