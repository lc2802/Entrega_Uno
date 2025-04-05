import fs from "fs";

class Products {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const productos = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(productos);
    } catch (error) {
      console.error("Error en /products :", error);
      return [];
    }
  }
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      return products.find((product) => product.id === id) || null;
    } catch (error) {
      console.error("Error en getProductById:", error);
      return null; 
    }
  }

  async postProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
  }) {
    const products = await this.getProducts();

    if (products.some((product) => product.code === code)) {
      throw new Error(`El producto ya existe`);
    }

    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const productToAdd = {
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
    };

    products.push(productToAdd);

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

    return productToAdd;
  }

  async putProduct(id, updtdProd) {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) throw new Error(`El producto no existe`);

    products[index] = { ...products[index], ...updtdProd };

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

    return products[index];
  }

  async deleteProductById(id) {
    const products = await this.getProducts();
    const newProducts = products.filter((product) => product.id !== id);

    if (products.length === newProducts.length) {
      throw new Error(`El producto no existe`);
    }

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(newProducts, null, 2)
    );
  }
}

export default Products;
