import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

@Entity('category')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}