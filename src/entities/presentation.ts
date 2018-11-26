import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('presentation')
export class Presentation {

    @PrimaryGeneratedColumn({name: "id"})
    id: number;
    
}
