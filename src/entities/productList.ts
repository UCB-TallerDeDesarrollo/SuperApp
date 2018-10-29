import { Entity, Column } from "typeorm";

@Entity("product_list")
export class ProductList {

    @Column({name: "product_id"})
    product_id: number;

    @Column({name: "list_id"})
    list_id: number;
}