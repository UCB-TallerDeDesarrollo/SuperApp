

import { LoadingPage } from './../loading/loading';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SupermarketLevelCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-supermarket-level-complete',
  templateUrl: 'supermarket-level-complete.html',
})
export class SupermarketLevelCompletePage {

  private lastNav:NavController;
  private level:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  //this.lastNav=navParams.get("lastNav");
    //this.level=navParams.get("level");
    this.navCtrl=this.lastNav;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    console.log(this.navParams.get('message'));
}
nextLevel(){
  
  this.viewCtrl.dismiss();
}
}
