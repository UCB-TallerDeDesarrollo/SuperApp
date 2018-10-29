import { User } from './user';
import { PrimaryGeneratedColumn, OneToOne, Column, Entity } from "typeorm";

@Entity("user_progress")
export class UserProgress
{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    easyLevel:number;
    @Column()
    mediumLevel:number;
    @Column()
    hardLevel:number;
    @Column()
    extremeLevel:number;
    @OneToOne(type=>User)
    user:User;
}