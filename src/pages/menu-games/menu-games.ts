import { Component } from '@angular/core';
import { SelectDifficultyPage } from '../select-difficulty/select-difficulty';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-menu-games',
    templateUrl: 'menu-games.html',
})
export class MenuGamesPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MenuGamesPage');
    }

    pushPageWord(){
        this.navCtrl.push(SelectDifficultyPage);
    }

    popPage(){
        this.navCtrl.pop();
    }
}
