import express from "express";
import Products from "./products.js";
import Carts from "./carts.js";

const api = express();

const PORT = 8080;

const productsClass = new Products("./products.json");

const cartsClass = new Carts("./carts.json");

api.use(express.json());

api.get("/api/products", async (request, response) => {
  try {
    const products = await productsClass.getProducts();
    response.json({ products });
  } catch (error) {
    response.status(500).json({ error: "Error al obtener productos" });
  }
});

api.get("/api/products/:id", async (request, response) => {
  const id = parseInt(request.params.id); 

  if (isNaN(id)) {
    return response
      .status(400)
      .json({ error: "El ID debe ser un número válido" });
  }

  try {
    const product = await productsClass.getProductById(id);

    if (!product) {
      return response.status(404).json({ error: "Producto no encontrado" });
    }

    response.json(product);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener el producto" });
  }
});

api.post("/api/products", async (request, response) => {
  try {
    const newProduct = await productsClass.postProduct(request.body);
    response
      .status(201)
      .json({ message: "Producto agregado", product: newProduct });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

api.put("/api/products/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const updateProduct = await productsClass.putProduct(id, request.body);
    response.json({ message: "Producto actualizado", product: updateProduct });
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
});

api.delete("/api/products/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    await productsClass.deleteProductById(id);
    response.json({ message: `Producto, ${id}, eliminado` });
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
});

api.get("/api/carts", async (request, response) => {
  try {
    const carts = await cartsClass.getCarts();
    response.json({ carts });
  } catch (error) {
    response.status(500).json({ error: "Error al obtener productos" });
  }
});

api.post("/api/carts", async (request, response) => {
  try {
    const { products } = request.body;

    if (!Array.isArray(products)) {
      return response.status(400).json({ error: "Productos no es arreglo" });
    }

    for (const product of products) {
      if (typeof product.id !== 'number' || typeof product.quantity !== 'number' || product.quantity <= 0) {
        return response.status(400).json({ error: "Indique correctametn el ID del producto y la cantidad mayor a 0" });
      }
    }

    for (const product of products) {
      const existingProduct = await productsClass.getProductById(product.id);
      if (!existingProduct) {
        return response.status(404).json({ error: `El producto con ID ${product.id} no existe.` });
      }
    }

    const newCart = await cartsClass.postCart({ products });

    response.status(201).json({ message: "Carrito creado", cart: newCart });
  } catch (error) {
    console.error("Error en /api/carts:", error);
    response.status(500).json({ error: "Error al crear el carrito." });
  }
});

api.delete("/api/carts/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    await cartsClass.deleteCartById(id);
    response.json({ message: `Carrito, ${id}, eliminado` });
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
});


api.listen(PORT, () => {
  console.log("Servidor levantado");
});
