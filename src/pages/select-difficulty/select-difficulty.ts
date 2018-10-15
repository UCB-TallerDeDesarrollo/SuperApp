import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordPage } from '../word/word';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { DifficultyProvider } from '../../shared/providers/DifficultyProvider';
import { Difficulty } from '../../shared/models/Difficulty.model';
@Component({
    selector: 'page-select-difficulty',
    templateUrl: 'select-difficulty.html',
})
export class SelectDifficultyPage {

    private imageSound: string;
    private easyStars: number;
    private mediumStars: number;
    private hardStars: number;
    private expertStars: number;

    constructor(
        public navCtrl             : NavController, 
        public navParams           : NavParams,
        private audioProvider      : AudioProvider,
        private difficultyProvider : DifficultyProvider
    ) {
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

    ionViewWillEnter() {
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
        this.difficultyProvider.getLastLevel(0).then(level => {
            this.navCtrl.push(WordPage, { 'level':level });
        });
    }

    openMediumMode() {
        this.difficultyProvider.getLastLevel(1).then(level => {
            this.navCtrl.push(WordPage, { 'level':level });
        });
    }

    openHardMode() {
        this.difficultyProvider.getLastLevel(2).then(level => {
            this.navCtrl.push(WordPage, { 'level':level });
        });
    }

    openExpertMode() {
        this.difficultyProvider.getLastLevel(3).then(level => {
            this.navCtrl.push(WordPage, { 'level':level });
        });
    }

    ionViewDidLoad() {
        this.difficultyProvider.countRows().then(number => {
            if(number < 4) {
                this.startDatabase();
            }
        });
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
