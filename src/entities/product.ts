import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category';
import { ProductLevel } from './productLevel';

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column()
    state: boolean;

    @ManyToOne(type => Category, category => category.products, { cascade: ['insert'] })
    category: Category;

    @OneToMany(type => ProductLevel, productLevel => productLevel.product)
    productLevel: ProductLevel[];
}