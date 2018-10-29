import { Column, PrimaryGeneratedColumn, OneToOne, Entity } from "typeorm";
import { User } from "./user";
import { Col } from "ionic-angular";
@Entity("user_progress")
export class UserProgress{
    constructor(easyLevel:number,mediumLevel:number,hardLevel:number,extremeLevel:number, userId:number)
    {
        this.easyLevel=easyLevel;
        this.mediumLevel=mediumLevel;
        this.hardLevel=hardLevel;
        this.extremeLevel=extremeLevel;
        this.userId=userId;
    }
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId:number;
    @Column()
    easyLevel:number;
    @Column()
    mediumLevel:number;
    @Column()
    hardLevel:number;
    @Column()
    extremeLevel:number;
/*    @OneToOne(type=>User, user=>user.userProgress)
    user:User;
*/
    public nextLevel(actualLevel:number)
    {
        this.nextEasy(actualLevel);
        this.nextMedium(actualLevel);
        this.nextHard(actualLevel);
        this.nextExtreme(actualLevel);
    }
    nextExtreme(actualLevel: number): any {
        if (actualLevel>=125 && actualLevel<200)
        {
            this.extremeLevel++;
        }
    }
    nextHard(actualLevel: number): any {
        if (actualLevel>=31 && actualLevel<124)
        {
            this.hardLevel++;
        }
    }
    nextMedium(actualLevel: number): any {
        if (actualLevel>=16 && actualLevel<30)
        {
            this.mediumLevel++;
        }
    }
    nextEasy(actualLevel: number) {
        if (actualLevel<15)
        {
            this.easyLevel++;
        }
    }
}