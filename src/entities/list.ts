import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("list")
export class List {

    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "name"})
    name: string;
}