import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordPage } from '../word/word';

@Component({
    selector: 'page-select-difficulty',
    templateUrl: 'select-difficulty.html',
})
export class SelectDifficultyPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad SelectDifficultyPage');
    }

    openEasyMode() {
        this.navCtrl.push(WordPage);
    }

    openMediumMode() {
        this.navCtrl.push(WordPage);
    }

    openHardMode() {
        this.navCtrl.push(WordPage);
    }

    openExpertMode() {
        this.navCtrl.push(WordPage);
    }
}
