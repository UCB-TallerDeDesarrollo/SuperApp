import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"; 

@Entity('supermarketdifficulty')
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
