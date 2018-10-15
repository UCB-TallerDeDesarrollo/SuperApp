import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordPage } from '../word/word';
import { AudioProvider } from '../../shared/providers/AudioProvider';
@Component({
    selector: 'page-select-difficulty',
    templateUrl: 'select-difficulty.html',
})
export class SelectDifficultyPage {

    private imageSound:String;
    
    constructor(
        public navCtrl        : NavController, 
        public navParams      : NavParams,
        private audioProvider : AudioProvider
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
}
