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
        this.coins=0;
        
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

    @Column()
    coins: number;
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
        this.coins = this.coins+ (2 * 5);
        if (actualLevel>=125 && actualLevel<200)
        {
            
            if (actualLevel==this.extremeLevel)
            {
                this.extremeLevel++;
            }
        }
    }
    nextHard(actualLevel: number): any {
        this.coins = this.coins+ (2 * 4);
        if (actualLevel>=31 && actualLevel<124)
        {
            if(actualLevel==this.hardLevel)
            {
                this.hardLevel++;
            }
            
        }
    }
    nextMedium(actualLevel: number): any {
        this.coins = this.coins+ (2 * 3);
        if (actualLevel>=16 && actualLevel<30)
        {
            if (actualLevel==this.mediumLevel)
            {
                this.mediumLevel++;
            }
            
        }
    }
    nextEasy(actualLevel: number) {
        this.coins =this.coins+ ( 2 * 2);
        if (actualLevel<15)
        {
        if (actualLevel==this.easyLevel)
        {
            this.easyLevel++;
        }
        }
    }

    nextExtremeSuper(actualLevelSuper: number): any {
        this.coins = this.coins+ (2 * 5);
        if (actualLevelSuper>=46 && actualLevelSuper<59)
        {
            if (actualLevelSuper==this.extremeLevelSuper)
            {
                this.extremeLevelSuper++;
            }
        }
    }
    nextHardSuper(actualLevelSuper: number): any {
        this.coins = this.coins+ (2 * 4);
        if (actualLevelSuper>=31 && actualLevelSuper<45)
        {
            if(actualLevelSuper==this.hardLevelSuper)
            {
                this.hardLevelSuper++;
            }
            
        }
    }
    nextMediumSuper(actualLevelSuper: number): any {
        this.coins = this.coins+ (2 * 3);
        if (actualLevelSuper>=16 && actualLevelSuper<30)
        {
            if (actualLevelSuper==this.mediumLevelSuper)
            {
                this.mediumLevelSuper++;
            }
            
        }
    }
    nextEasySuper(actualLevelSuper: number) {
        this.coins = this.coins+ (2 * 2);
        if (actualLevelSuper<15)
        {
        if (actualLevelSuper==this.easyLevelSuper)
        {
            this.easyLevelSuper++;
        }
        }
    }





}