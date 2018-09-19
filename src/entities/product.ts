import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category';

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
}