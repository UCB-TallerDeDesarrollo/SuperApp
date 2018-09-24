import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelCompletePage');
  }
  nextLevel(){
    this.viewCtrl.dismiss();
  }
}
