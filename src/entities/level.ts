import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductLevel } from "./productLevel";

@Entity('level')
export class Level {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => ProductLevel, productLevel => productLevel.level)
    productLevel: ProductLevel[];
}