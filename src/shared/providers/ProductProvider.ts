import { Product } from "../models/Product.model";

export abstract class ProductProvider {
    abstract getProducts(): Product[];
    abstract getProductById(id: number): Product;
    abstract getRandomProduct(): Product;
}
