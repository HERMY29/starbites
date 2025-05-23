COLOCAR EN LA TERMINAL LAS SIGUIENTES LINEAS DE CODIGO UNA POR UNA

npm install express
npm install dotenv
npm install cors
npm install bcrypt jsonwebtoken


INSTALAR LA EXTENSION THUNDER CLIENT


CREAR PETICIONES EN EL THUNDER

-------------USERS--------------
URL: http://localhost:3000/register

1. POST /register
Cuerpo de la solicitud (JSON):
{
    "email": "usuario@example.com",
    "password": "test123"
}

http://localhost:3000/login
2. POST /login
Cuerpo de la solicitud (JSON):
{
    "email": "usuario@example.com",
    "password": "test123"
}
http://localhost:3000/users/getUser/1
3. GET /user/:id

http://localhost:3000/users/updateUser/1
4. PUT /user/:id
Cuerpo de la solicitud (JSON):
{
  "nombre": "Juan Pérez",
  "email": "juan_nuevo@example.com",
  "password": "nuevo123"
}


http://localhost:3000/users/deleteUser/1
5. DELETE /user/:id


-------------MOVIES----------------

URL:http://localhost:3000/movies/create
1. POST /movies
Cuerpo de la solicitud (JSON):
{
  "nombre": "Flow",
  "descripcion": "Un gato tratando de sobrevivir en un mundo post apocaliptico buscando su nuevo hogar atraves de las fuertes inundaciones y adversidades con las que se cruzará en su camino",
  "calificacion": 9.9,
  "miniatura": "{https://image.url/inception.jpg}",
  "id_categoria": 1
}

URL: http://localhost:3000/movies/getMovie/1
2. GET GETMOVIE
Respuesta (JSON): No se requiere cuerpo de solicitud.

URL: http://localhost:3000/movies/getMovies
3. GET SEARCHALLMOVIES
Respuesta (JSON): No se requiere cuerpo de solicitud.

URL: http://localhost:3000/movies/getMovieByName?nombre=Five Nights at Freddys
4. GET GETMOVIESBYNAME

URL: http://localhost:3000/movies/updateMovie/1
5. PUT 
Cuerpo de la solicitud (JSON):
{
  "nombre": "FNAF1",
  "descripcion": "Robots que se mueven por la noche",
  "calificacion": 9.2,
  "miniatura": "https://ejemplo.com/FNAF.jpg",
  "id_categoria": 3
}


URL: http://localhost:3000/movies/deleteMovie/1
6. DELETE 
Respuesta (JSON): No se requiere cuerpo de solicitud.

---------------BOOKS------------------

URL: http://localhost:3000/books/createBook
1. POST CREATEBOOK
Cuerpo de la solicitud (JSON):
{
  "titulo": "1984",
  "autor": "George Orwell",
  "descripcion": "Una distopía sobre el control gubernamental.",
  "calificacion": 9.5,
  "portada": "https://ejemplo.com/1984.jpg",
  "id_categoria": 2
}

URL: http://localhost:3000/books/getBook/1
2. GET IDBOOK
Respuesta (JSON): No se requiere cuerpo de solicitud.

URL: http://localhost:3000/books/getBooks?estado=disponible
3. GET SEARCHALLBOOKS
Respuesta (JSON): No se requiere cuerpo de solicitud.

URL: http://localhost:3000/books/getBookByName?titulo=1984
4. GET GETBOOKSBYNAME


URL:http://localhost:3000/books/updateBook/1
5. PUT UPDATEBOOK
Cuerpo de la solicitud (JSON):
{
  "titulo": "1984",
  "autor": "George Orwell",
  "descripcion": "Una novela distópica sobre un futuro totalitario.",
  "calificacion": 9.8,
  "portada": "https://ejemplo.com/1984_updated.jpg",
  "id_categoria": 2
}


URL:http://localhost:3000/books/deleteBook/1
6. DELETE DELETEBOOK
Respuesta (JSON): No se requiere cuerpo de solicitud.
