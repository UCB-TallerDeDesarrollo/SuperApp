import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Product } from "./product";

@Entity('category')
export class Category {

    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "name"})
    name: string;

    products: Array<Product>=[];

    public addProduct(product){
        this.products.push(product);
    }
}
