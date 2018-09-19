import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Product } from "./product";

@Entity('category')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    /*@OneToMany(type => Product, product => product.category)
    products: Product[];*/
}
