# API CRUD Post

Este proyecto implementa una API RESTful para gestionar posts usando Node.js, Express y MongoDB.

## Estructura de archivos

- **app.js**
  - Archivo principal. Configura Express, conecta a MongoDB y monta las rutas de la API.

- **models/Post.js**
  - Define el modelo Mongoose para los posts. Incluye los campos: title, text, author, createdAt, updatedAt y validaciones.

- **routes/posts.js**
  - Contiene las rutas CRUD:
    - `POST /api/posts`: Crear un post.
    - `GET /api/posts`: Listar todos los posts.
    - `GET /api/posts/:id`: Obtener detalle de un post.
    - `PATCH /api/posts/:id`: Modificar un post.
    - `DELETE /api/posts/:id`: Eliminar un post.

- **package.json**
  - Define las dependencias y scripts del proyecto. El comando `npm start` ejecuta el servidor en el puerto 8000.

- **.gitignore**
  - Excluye `node_modules` y archivos sensibles del repositorio.

- **postman_collection.json**
  - Colección de Postman para probar todos los endpoints del API.

## Uso

1. Instala dependencias:
   ```powershell
   npm install
   ```
2. Inicia MongoDB y el servidor:
   ```powershell
   npm start
   ```
3. Importa la colección en Postman y prueba los endpoints.

## Endpoints principales

- **Crear Post**: `POST /api/posts`
- **Listar Posts**: `GET /api/posts`
- **Detalle Post**: `GET /api/posts/:id`
- **Modificar Post**: `PATCH /api/posts/:id`
- **Eliminar Post**: `DELETE /api/posts/:id`

## Autor
Palmira Ramírez


## Explicación para principiantes: ¿Cómo funciona una ruta en posts.js?

El archivo `routes/posts.js` define las rutas (endpoints) de la API para el modelo "Post". Cada ruta corresponde a una operación CRUD que puedes probar en Postman.

Por ejemplo, la ruta para **crear un post** es:

```js
router.post('/', async (req, res) => {
  try {
    const { title, text, author } = req.body; // Recibe datos del cliente
    const post = new Post({ title, text, author }); // Crea un nuevo objeto Post usando el modelo
    await post.validate(); // Valida los datos según el esquema
    await post.save(); // Guarda el post en MongoDB
    res.status(201).json(post); // Devuelve el post creado al cliente
  } catch (err) {
    res.status(400).json({ error: err.message }); // Si hay error, responde con 400 y el mensaje
  }
});
```

¿Qué ocurre?
- Cuando envías una petición POST desde Postman a `/api/posts`, esta función se ejecuta.
- Toma los datos del cuerpo de la petición (`title`, `text`, `author`).
- Usa el modelo `Post` (definido en `models/Post.js`) para crear y guardar el nuevo post en la base de datos.
- Devuelve el resultado al cliente (Postman).

Todas las rutas funcionan igual:
- Reciben la petición.
- Usan el modelo para interactuar con la base de datos.
- Devuelven la respuesta.

Esta estructura ayuda a mantener el código organizado y facilita el aprendizaje y la extensión del proyecto.
  

## Explicación para principiantes: ¿Cómo funciona postman_collection.json?

El archivo `postman_collection.json` contiene una colección de peticiones HTTP para Postman. Cada petición está configurada para interactuar con tu API (por ejemplo, crear, listar, modificar o borrar posts).

**¿Cómo funciona?**

1. Importas el archivo en Postman y ves una lista de peticiones listas para usar.
2. Cuando ejecutas una petición (por ejemplo, `POST /api/posts`), Postman envía los datos al servidor Express.
3. El servidor Express recibe la petición y la dirige a la ruta correspondiente en `routes/posts.js`.
4. La ruta usa el modelo Mongoose (`models/Post.js`) para interactuar con la base de datos.
5. El servidor responde a Postman con los datos solicitados o el resultado de la operación.

**Relación con el modelo:**
- El archivo no tiene código ni lógica; solo define cómo deben ser las peticiones.
- Cuando ejecutas una petición, se activa la lógica definida en tus rutas y modelos.

**Variables en la colección:**
- En las peticiones como Detalle, Modificar y Eliminar, verás `{{postId}}` en la URL.
- Debes reemplazar `{{postId}}` por el ID real de un post para que la petición funcione.

Esta colección te permite probar tu API fácilmente y entender cómo interactúan los diferentes componentes del proyecto.

## Explicación para principiantes: ¿Qué son package.json y package-lock.json?

**package.json**
- Es el archivo donde declaras los paquetes (dependencias) que tu proyecto necesita y los scripts para ejecutarlo.
- Ejemplo: `"express": "^4.18.2"` indica que tu proyecto necesita Express, versión 4.18.2 o superior.
- Tú editas este archivo para agregar o quitar dependencias.

**package-lock.json**
- Se genera automáticamente cuando instalas dependencias con npm.
- Registra la versión exacta de cada paquete y sus dependencias internas.
- Garantiza que todos los que instalen el proyecto obtengan el mismo entorno y versiones.
- No debes editarlo manualmente; npm lo gestiona por ti.

**Relación entre ambos:**
- Tú editas `package.json` para declarar lo que necesitas.
- npm usa `package-lock.json` para instalar exactamente lo mismo en todos los equipos.

Esto ayuda a evitar problemas por diferencias de versiones y asegura que el proyecto funcione igual para todos.

## Explicación para principiantes: ¿Cómo modificar el modelo en models/Post.js?

El archivo `models/Post.js` define la estructura y las reglas de validación para los datos de los posts. Si quieres agregar, quitar o modificar un campo, debes hacerlo en este archivo.

Por ejemplo, para agregar un campo nuevo llamado `category` (tipo String, requerido), modifica el esquema así:

```js
const postSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 6 },
  text: { type: String, required: true, minlength: 6 },
  author: { type: String, required: true },
  category: { type: String, required: true } // Nuevo campo
}, { timestamps: true });
```

Después de guardar el archivo, podrás enviar el campo `category` al crear o modificar un post. Si no lo envías, la validación fallará y recibirás un error.

En resumen: todos los cambios en la estructura de los datos se hacen en `models/Post.js`. El modelo controla cómo se guardan y validan los datos en MongoDB.
