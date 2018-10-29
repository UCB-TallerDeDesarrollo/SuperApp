import { Column, PrimaryGeneratedColumn, OneToOne, Entity } from "typeorm";
import { User } from "./user";
@Entity("user_progress")
export class UserProgress{
    constructor(easyLevel:number,mediumLevel:number,hardLevel:number,extremeLevel:number)
    {
        this.easyLevel=easyLevel;
        this.mediumLevel=mediumLevel;
        this.hardLevel=hardLevel;
        this.extremeLevel=extremeLevel;
    }
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
    @OneToOne(type=>User, user=>user.userProgress)
    user:User;
}