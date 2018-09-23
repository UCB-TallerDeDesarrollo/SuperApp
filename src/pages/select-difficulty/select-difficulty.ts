import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordPage } from '../word/word';

@Component({
    selector: 'page-select-difficulty',
    templateUrl: 'select-difficulty.html',
})
export class SelectDifficultyPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    openEasyMode() {
        this.navCtrl.push(WordPage);
    }

    openMediumMode() {
        
    }

    openHardMode() {

    }

    openExpertMode() {

    }
}
