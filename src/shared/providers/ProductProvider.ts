import { Product } from "../models/product.model";

export abstract class ProductProvider {
    abstract getProductOfActualLevel():Product;
    abstract getQuantityOfProducts():number;
    abstract getActualLevel():number;
    abstract nextLevel():void;
    abstract setLevel(level:number):void;
}
