import { WordPage } from './../word/word';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {
  public level:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.level=navParams.get("level");
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.init()
    }, 500);
  }
  init()
  {
    this.navCtrl.push(WordPage, this.level);
    this.navCtrl.remove(this.navCtrl.length()-1);}
}
