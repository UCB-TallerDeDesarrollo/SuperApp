import { SupermarketPage } from './../supermarket/supermarket';
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
  public lastNav:NavController;
  public typeOfGame : string;
  public mode:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.level=navParams.get("level");
   this.lastNav=navParams.get("lastNav");
   this.typeOfGame=navParams.get("typeOfGame");
   this.mode=navParams.get("mode");
   this.navCtrl=this.lastNav;
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.init()
    }, 500);
  }
  init()
  {
    if(this.typeOfGame==="supermarket"){
      this.navCtrl.push(SupermarketPage, {level: this.level,mode:this.mode}); 
    }else{
      this.navCtrl.push(WordPage, {level: this.level});
    }
    this.navCtrl.remove(this.navCtrl.length()-1);
  }
}
