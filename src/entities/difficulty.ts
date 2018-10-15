import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductLevel } from "./productLevel";

@Entity('difficulty')
export class Difficulty {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;
    
    @Column()
    difficultyType: number;

    @Column()
    lastLevel: number;
}
