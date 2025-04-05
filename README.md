# API de Productos y Carritos

Esta API permite realizar operaciones CRUD (crear, leer, actualizar, eliminar) para productos y carritos.

### Endpoints ###

### Productos

1. **GET /api/products**

   Obtiene todos los productos disponibles.

2. **GET /api/products/:id**

   Obtiene un producto específico por ID.

3. **POST /api/products**

   Crea un nuevo producto. Se tienen que enviar los datos en el cuerpo de la solicitud en formato JSON.

   **Cuerpo de la solicitud**:
   ```json
   {
     "title": "Producto Nuevo",
     "description": "Descripción del producto",
     "code": "67890",
     "price": 200,
     "status": "activo",
     "stock": 5,
     "category": "Categoría 2"
   }
   ```

4. **PUT /api/products/:id**

   Actualiza un producto existente. Se tienen que enviar los datos en el cuerpo de la solicitud en formato JSON.

   **Cuerpo de la solicitud**:
   ```json
   {
     "price": 150,
     "stock": 12
   }
   ```

5. **DELETE /api/products/:id**

   Elimina un producto específico por ID.


### Carritos

1. **GET /api/carts**

   Obtiene todos los carritos existentes.


2. **POST /api/carts**

   Crea un nuevo carrito. Se tienen que enviar los productos en el cuerpo de la solicitud en formato JSON.

   **Cuerpo de la solicitud**:
   ```json
   {
     "products": [
       { "id": 1, "quantity": 2 },
       { "id": 2, "quantity": 1 }
     ]
   }
   ```


3. **DELETE /api/carts/:id**

   Elimina un carrito específico por ID.


## Requisitos

- Node.js
- Express.js

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   node api.js
   ```

El servidor va a quedar levantado en el puerto (configuración que se puede cambiar) `http://localhost:8080`.

