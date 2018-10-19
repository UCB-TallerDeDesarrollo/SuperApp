import { Product } from "../models/Product.model";

export abstract class ProductProvider {
    abstract getProductOfActualLevel(level: number):Product;
    abstract getQuantityOfProducts():number;
}
