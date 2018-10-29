import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"; 

@Entity('supermarket_difficulty')
export class SupermarketDifficulty {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;
    
    @Column()
    difficultyType: number;

    @Column()
    lastLevel: number;
}
