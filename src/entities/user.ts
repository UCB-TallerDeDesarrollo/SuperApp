import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserProgress } from './userProgress';


@Entity('user')
export class User {

    constructor(username:string, birthdate:Date, profilePictureURL:string)
{
    this.username=username;
    this.birthdate=birthdate;
    this.profilePictureURL=profilePictureURL;
    this.userProgress=new UserProgress(1,16,31,125, this.id, 1, 16, 31, 46);
}

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    birthdate: Date;

    @Column()
    profilePictureURL: string;

    userProgress:UserProgress;
}