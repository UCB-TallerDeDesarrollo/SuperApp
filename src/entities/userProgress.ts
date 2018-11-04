import { Column, PrimaryGeneratedColumn, OneToOne, Entity } from "typeorm";
import { User } from "./user";
import { Col } from "ionic-angular";
@Entity("user_progress")
export class UserProgress{
    constructor(easyLevel:number,mediumLevel:number,hardLevel:number,extremeLevel:number, userId:number
    , easyLevelSuper:number,mediumLevelSuper:number,hardLevelSuper:number,extremeLevelSuper:number
    )
    {
        this.easyLevel=easyLevel;
        this.mediumLevel=mediumLevel;
        this.hardLevel=hardLevel;
        this.extremeLevel=extremeLevel;
        this.userId=userId;
        this.easyLevelSuper=easyLevelSuper;
        this.mediumLevelSuper=mediumLevelSuper;
        this.hardLevelSuper=hardLevelSuper;
        this.extremeLevelSuper=extremeLevelSuper;
        
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

    @Column()
    easyLevelSuper:number;
    @Column()
    mediumLevelSuper:number;
    @Column()
    hardLevelSuper:number;
    @Column()
    extremeLevelSuper:number;
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
    public nextLevelSuper(actualLevel:number)
    {
        this.nextEasySuper(actualLevel);
        this.nextMediumSuper(actualLevel);
        this.nextHardSuper(actualLevel);
        this.nextExtremeSuper(actualLevel);
    }
    nextExtreme(actualLevel: number): any {
        if (actualLevel>=125 && actualLevel<200)
        {
            if (actualLevel==this.extremeLevel)
            {
                this.extremeLevel++;
            }
        }
    }
    nextHard(actualLevel: number): any {
        if (actualLevel>=31 && actualLevel<124)
        {
            if(actualLevel==this.hardLevel)
            {
                this.hardLevel++;
            }
            
        }
    }
    nextMedium(actualLevel: number): any {
        if (actualLevel>=16 && actualLevel<30)
        {
            if (actualLevel==this.mediumLevel)
            {
                this.mediumLevel++;
            }
            
        }
    }
    nextEasy(actualLevel: number) {
        if (actualLevel<15)
        {
        if (actualLevel==this.easyLevel)
        {
            this.easyLevel++;
        }
        }
    }

    nextExtremeSuper(actualLevelSuper: number): any {
        if (actualLevelSuper>=46 && actualLevelSuper<59)
        {
            if (actualLevelSuper==this.extremeLevelSuper)
            {
                this.extremeLevelSuper++;
            }
        }
    }
    nextHardSuper(actualLevelSuper: number): any {
        if (actualLevelSuper>=31 && actualLevelSuper<45)
        {
            if(actualLevelSuper==this.hardLevelSuper)
            {
                this.hardLevelSuper++;
            }
            
        }
    }
    nextMediumSuper(actualLevelSuper: number): any {
        if (actualLevelSuper>=16 && actualLevelSuper<30)
        {
            if (actualLevelSuper==this.mediumLevelSuper)
            {
                this.mediumLevelSuper++;
            }
            
        }
    }
    nextEasySuper(actualLevelSuper: number) {
        if (actualLevelSuper<15)
        {
        if (actualLevelSuper==this.easyLevelSuper)
        {
            this.easyLevelSuper++;
        }
        }
    }





}