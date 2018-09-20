import { Entity, ManyToOne } from "typeorm";
import { Product } from "./product";
import { Level } from "./level";

@Entity('product_level')
export class ProductLevel {
 
    @ManyToOne(type => Product, product => product.productLevel, { primary: true })
    product: Product;

    @ManyToOne(type => Level, level => level.productLevel, { primary: true })
    level: Level;
}