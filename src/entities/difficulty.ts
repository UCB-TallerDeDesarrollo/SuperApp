import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { User } from "./user";

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
