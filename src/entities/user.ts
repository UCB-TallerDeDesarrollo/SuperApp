import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Difficulty } from './difficulty';


@Entity('user')
export class User {

    constructor(username:string, birthdate:Date, profilePictureURL:string)
{
    this.username=username;
    this.birthdate=birthdate;
    this.profilePictureURL=profilePictureURL;
    this.dificulty=new Difficulty();
}

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    birthdate: Date;

    @Column()
    profilePictureURL: string;

    @OneToOne(type=>Difficulty, dificulty=>dificulty.user)
    dificulty:Difficulty;
}