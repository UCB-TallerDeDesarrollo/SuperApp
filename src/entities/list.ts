import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("list")
export class List {

    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "name"})
    name: string;

    @Column({name: "user_id"})
    user_id: number;
}