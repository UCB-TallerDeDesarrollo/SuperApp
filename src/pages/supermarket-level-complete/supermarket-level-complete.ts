

import { LoadingPage } from './../loading/loading';
import { SupermarketPage } from './../supermarket/supermarket';
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
  this.lastNav=navParams.get("lastNav");
    this.level=navParams.get("level"); 
    this.navCtrl=this.lastNav;
  }

nextLevel(){
    this.viewCtrl.dismiss();
    this.navCtrl.push(LoadingPage, {lastNav:this.navCtrl, level:this.level, typeOfGame:'supermarket'});
    this.navCtrl.remove(this.navCtrl.length()-1);
   
}
}
