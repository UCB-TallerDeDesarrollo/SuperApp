import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProductLevel } from "./productLevel";

@Entity('level')
export class Level {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => ProductLevel, productLevel => productLevel.level)
    productLevel: ProductLevel[];
}