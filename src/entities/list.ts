import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { Product } from "./product";

@Entity("list")
export class List {

    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "name"})
    name: string;

    @Column({name: "user_id"})
    user_id: number;

    @Column({name: "on_view"})
    on_view: number = 1;

    products: Array<Product> = [];
}