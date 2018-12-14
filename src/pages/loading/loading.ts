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
  public maxLevel: number;
  public lastNav:NavController;
  public typeOfGame : string; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.level=navParams.get("level");
    this.maxLevel=navParams.get('maxLevel');
    this.lastNav=navParams.get("lastNav");
    this.typeOfGame=navParams.get("typeOfGame"); 
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
      this.navCtrl.push(SupermarketPage, {level: this.level ,maxLevel:this.maxLevel}); 
    }else{
      this.navCtrl.push(WordPage, {level: this.level,dark:true});
    }
    this.navCtrl.remove(this.navCtrl.length()-1);
  }
}
