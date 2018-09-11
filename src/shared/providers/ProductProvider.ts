import { Product } from "../models/product.model";

interface IProductProvider {
    getProducts(): Product[];
    getProductById(id: number): Product;
    getRandomProduct(): Product;
}

export abstract class ProductProvider implements IProductProvider {
    abstract getProducts(): Product[];
    abstract getProductById(id: number): Product;
    abstract getRandomProduct(): Product;
}
