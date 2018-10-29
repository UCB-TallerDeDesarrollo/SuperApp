import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserProgress } from './userProgress';
import { type } from 'os';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    birthdate: Date;

    @Column()
    profilePictureURL: string;

    @OneToOne(type=>UserProgress)
    userProgress:UserProgress;
}