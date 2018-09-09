import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { LoadingPage } from '../loading/loading';

/**
 * Generated class for the LevelCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-level-complete',
  templateUrl: 'level-complete.html',
})
export class LevelCompletePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelCompletePage');
  }
  nextLevel(){
    this.navCtrl.push(LoadingPage);
  }
}
