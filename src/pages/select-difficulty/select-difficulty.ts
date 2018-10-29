import { LoginStatus } from './../../providers/login/LoginStatus';
import { SupermarketPage } from './../supermarket/supermarket';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordPage } from '../word/word';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { UserProvider } from '../../providers/user/user';
import { Login } from '../../providers/login/Login';
import { DifficultyProvider } from '../../shared/providers/DifficultyProvider';
import { SupermarketDifficultyProvider } from '../../shared/providers/SupermarketDifficultyProvider'
import { Difficulty } from '../../shared/models/Difficulty.model';
@Component({
    selector: 'page-select-difficulty',
    templateUrl: 'select-difficulty.html',
})
export class SelectDifficultyPage {

    private imageSound: string;
    public easyStars: number;
    public mediumStars: number;
    public hardStars: number;
    public expertStars: number;
    typeOfGame: string;
    constructor(
        public navCtrl             : NavController, 
        public navParams           : NavParams,
        private audioProvider      : AudioProvider,
        private usersProvider      : UserProvider,
        private login              : Login,
        private difficultyProvider : DifficultyProvider,
        private supermarketDifficultyProvider: SupermarketDifficultyProvider
    ) {
        this.typeOfGame=this.navParams.get("typeOfGame");
        this.easyStars = 0;
        this.mediumStars = 0;
        this.hardStars = 0;
        this.expertStars = 0;
    }

    stopSound(){
        this.audioProvider.changeState();
        this.changeSoundIcon();
    }
  
    ionViewDidEnter() {
        this.changeSoundIcon();
    }

    async ionViewWillEnter() {
        await this.prepareAnonimusUser();
        this.setupStars();
        this.setupSupermarket();
      
    }
    async prepareAnonimusUser()
  {
    await this.usersProvider.prepareAnonimusUser();
    await this.login.loadingGameData();
  }
    setupStars() {
        this.setupEasy();
        this.setupMedium();
        this.setupHard();
        this.setupExtreme();
    }
    setupExtreme(): any {
        let actualExtremeLevel=LoginStatus.userProgress.extremeLevel-125;
        this.expertStars=Math.trunc(actualExtremeLevel/19);
    }
    setupHard(): any {
        let actualHardLevel=LoginStatus.userProgress.hardLevel-31;
        this.hardStars=Math.trunc(actualHardLevel/19);
    }
    setupMedium(): any {
        let actualMediumLevel=LoginStatus.userProgress.mediumLevel-16;
        this.mediumStars=Math.trunc(actualMediumLevel/3);
    }
    setupEasy(): any {
        let actualEasyLevel=LoginStatus.userProgress.easyLevel;
        this.easyStars=Math.trunc(actualEasyLevel/3);
    }

    setupSupermarket()
    {
        this.typeOfGame=this.navParams.get("typeOfGame");
      
        if(this.typeOfGame === "supermarket"){
            this.difficultyProvider.countRows().then(number => {
                if(number == 4) {
                    this.easyStars = 0;
                    this.mediumStars = 0;
                    this.hardStars = 0;
                    this.expertStars = 0;
                    this.difficultyProvider.getPercentageProgress(0).then(number => {
                        let numberProgress: number = 20;
                        for(let index = 1; index <= 5; ++index) {
                            if(number >= numberProgress * index) {
                                this.easyStars++;
                            }
                        }
                    });
                    this.difficultyProvider.getPercentageProgress(1).then(number => {
                        let numberProgress: number = 20;
                        for(let index = 1; index <= 5; ++index) {
                            if(number >= numberProgress * index) {
                                this.mediumStars++;
                            }
                        }
                    });
                    this.difficultyProvider.getPercentageProgress(2).then(number => {
                        let numberProgress: number = 20;
                        for(let index = 1; index <= 5; ++index) {
                            if(number >= numberProgress * index) {
                                this.hardStars++;
                            }
                        }
                    });
                    this.difficultyProvider.getPercentageProgress(3).then(number => {
                        let numberProgress: number = 20;
                        for(let index = 1; index <= 5; ++index) {
                            if(number >= numberProgress * index) {
                                this.expertStars++;
                            }
                        }
                    });
                }
            });
        }
    }
    changeSoundIcon(){
        if(this.audioProvider.isMuted()){
            this.imageSound = "assets/imgs/soundoff.png";
        }
        else{
            this.imageSound = "assets/imgs/soundon.png";
        }
    }

    changeState() {
        this.audioProvider.changeState();
    }

    openEasyMode() {
        if(this.typeOfGame==="supermarket"){
            
            this.supermarketDifficultyProvider.getLastLevel(0).then(level => { 
                this.navCtrl.push(SupermarketPage, { 'level':level });
            })
        }else{
            this.navCtrl.push(WordPage, {level:LoginStatus.userProgress.easyLevel });
        }
          
    }


    openMediumMode() {
        if(this.typeOfGame==="supermarket"){
            this.supermarketDifficultyProvider.getLastLevel(1).then(level => { 
                this.navCtrl.push(SupermarketPage, { 'level':level });
            });
        }else{
            this.navCtrl.push(WordPage, {level:LoginStatus.userProgress.mediumLevel });
        }
    }

    openHardMode() {
        if(this.typeOfGame==="supermarket"){ 
            this.supermarketDifficultyProvider.getLastLevel(2).then(level => { 
                this.navCtrl.push(SupermarketPage, { 'level':level });
            });
        }else{
            this.navCtrl.push(WordPage, {level:LoginStatus.userProgress.hardLevel });
        }
    }

    openExpertMode() {
        if(this.typeOfGame==="supermarket"){
            this.supermarketDifficultyProvider.getLastLevel(3).then(level => { 
                this.navCtrl.push(SupermarketPage, { 'level':level });
            });
        }else{
            this.navCtrl.push(WordPage, {level:LoginStatus.userProgress.extremeLevel });
     }
    }

    ionViewDidLoad() {
        if(this.typeOfGame==="supermarket"){
            this.supermarketDifficultyProvider.countRows().then(number => {
                if(number < 4) {
                    this.startDatabaseSuperMarket();
                }
            });
        }else{
            this.difficultyProvider.countRows().then(number => {
                if(number < 4) {
                    this.startDatabase();
                }
            });
        }
        
    }

    startDatabaseSuperMarket(){
        let modesSupermarket: Difficulty[] = [
            Difficulty.createDifficulty(1, '000000000000000', 0, 1),
            Difficulty.createDifficulty(2, '000000000000000', 1, 16),
            Difficulty.createDifficulty(3, '000000000000000', 2, 31),
            Difficulty.createDifficulty(4, '000000000000000', 3, 46)
        ];
        for(let index = 0; index < 4; ++index) {
            this.supermarketDifficultyProvider.saveDifficulty(modesSupermarket[index]);
            
        }
    }

    startDatabase() { 
           
            let modes: Difficulty[] = [
                Difficulty.createDifficulty(1, '000000000000000', 0, 1),
                Difficulty.createDifficulty(2, '000000000000000', 1, 16),
                Difficulty.createDifficulty(3, '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 2, 31),
                Difficulty.createDifficulty(4, '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 3, 125)
            ];
            for(let index = 0; index < 4; ++index) {
                this.difficultyProvider.saveDifficulty(modes[index]);
            }     
       
    }


    generateArray(stars) {
        let resp = [];
        for(let index = 0; index < stars; ++index) {
            resp.push(1);
        }
        return resp;
    }
}
