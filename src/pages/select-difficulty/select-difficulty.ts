import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordPage } from '../word/word';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { DifficultyProvider } from '../../shared/providers/DifficultyProvider';
@Component({
    selector: 'page-select-difficulty',
    templateUrl: 'select-difficulty.html',
})
export class SelectDifficultyPage {

    private imageSound:String;
    
    constructor(
        public navCtrl             : NavController, 
        public navParams           : NavParams,
        private audioProvider      : AudioProvider,
        private difficultyProvider : DifficultyProvider
    ) {}

    stopSound(){
        this.audioProvider.changeState();
        this.changeSoundIcon();
    }
  
    ionViewDidEnter() {
        this.changeSoundIcon(); 
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
        this.navCtrl.push(WordPage, {'level':1});
    }

    openMediumMode() {
        this.navCtrl.push(WordPage, {'level':16});
    }

    openHardMode() {
        this.navCtrl.push(WordPage, {'level':31});
    }

    openExpertMode() {
        this.navCtrl.push(WordPage, {'level':125});
    }

    ionViewDidLoad() {
        this.difficultyProvider.countUsers().then(number => {
            if(number < 4) {
                this.startDatabase();
            }
        })
    }

    startDatabase() {

    }
}
