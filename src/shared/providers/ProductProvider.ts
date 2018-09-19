import { Product } from "../models/Product.model";

export abstract class ProductProvider {
    abstract getProductOfLevel(level:number):Product;
}
