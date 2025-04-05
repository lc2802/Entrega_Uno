import fs from "fs";
import Products from "./products.js";

const productsClass = new Products("./products.json");

class Carts {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      const carts = await fs.promises.readFile(this.path, "utf-8");

      if (!carts.trim()) {
        return [];
      }

      return JSON.parse(carts);
    } catch (error) {
      console.error("Error al obtener carritos:", error);
      return [];
    }
  }

  async getProductsById(id) {
    try {
      const carts = await this.getCarts();
      return carts.find((cart) => cart.id === id) || null;
    } catch (error) {
      console.error("Error en /products:id :", error);
      return null;
    }
  }

  async postCart({ products }) {
    const carts = await this.getCarts();

    for (const product of products) {
      if (
        typeof product.id !== "number" ||
        typeof product.quantity !== "number" ||
        product.quantity <= 0
      ) {
        throw new Error(
          "Indique correctametn el ID del producto y la cantidad mayor a 0"
        );
      }

      const existingProduct = await productsClass.getProductById(product.id);
      if (!existingProduct) {
        throw new Error(`El producto con ID ${product.id} no existe.`);
      }
    }

    const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    const newCart = {
      id,
      products,
    };

    carts.push(newCart);

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

    return newCart;
  }

  async deleteCartById(id) {
    const carts = await this.getCarts();
    
    const newCarts = carts.filter((cart) => cart.id !== id);

    if (carts.length === newCarts.length) {
      throw new Error(`El producto no existe`);
    }

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(newCarts, null, 2)
    );
  }
}
export default Carts;
