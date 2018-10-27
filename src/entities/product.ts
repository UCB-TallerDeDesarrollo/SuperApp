import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category';
import { ProductLevel } from './productLevel';

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "title"})
    title: string;

    @Column({name: "image"})
    image: string;

    @Column({name: "state"})
    state: boolean = true;

    @Column({name: "on_list"})
    on_list: boolean = true;

    @Column({name: "audio"})
    audio: string

    @Column({name: "category_id"})
    category_id: number;

    @OneToMany(type => ProductLevel, productLevel => productLevel.product)
    productLevel: ProductLevel[];
}