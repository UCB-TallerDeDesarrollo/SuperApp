import { LoadingPage } from './../loading/loading';
import { SupermarketPage } from './../supermarket/supermarket';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginStatus } from '../../providers/login/LoginStatus';

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
  private maxLevel:number;
  private difficulty:number;
  public cantStars: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.lastNav=navParams.get("lastNav");
    this.level=navParams.get("level");
    this.maxLevel=navParams.get("maxLevel");
    this.difficulty=navParams.get("difficulty");
    this.navCtrl=this.lastNav;

    if (this.isEasyDifficulty()) { 
      this.cantStars = this.setupEasySuper();
    } else if (this.isMediumDifficulty()) { 
      this.cantStars= this.setupMediumSuper();
    } else if (this.isHardDifficulty()) { 
      this.cantStars= this.setupHardSuper();
    } else { 
      this.cantStars= this.setupExtremeSuper();
    }
  }

  isEasyDifficulty(){
    return this.difficulty === 0;
  }

  isMediumDifficulty(){
    return this.difficulty === 1;
  }

  isHardDifficulty(){
    return this.difficulty === 2;
  }

  nextLevel(){
      this.viewCtrl.dismiss();
      this.navCtrl.push(LoadingPage, {lastNav:this.navCtrl, level:this.level, typeOfGame:'supermarket',maxLevel:this.maxLevel});
      this.navCtrl.remove(this.navCtrl.length()-1);
    
  }

  setupExtremeSuper(): any {
    let actualExtremeLevel=LoginStatus.userProgress.extremeLevelSuper-46;
    return Math.trunc(actualExtremeLevel/3);
  }
  setupHardSuper(): any {
      let actualHardLevel=LoginStatus.userProgress.hardLevelSuper-31;
      return Math.trunc(actualHardLevel/3);
  }
  setupMediumSuper(): any {
      let actualMediumLevel=LoginStatus.userProgress.mediumLevelSuper-16;
      return Math.trunc(actualMediumLevel/3);
  }
  setupEasySuper(): any {
      let actualEasyLevel=LoginStatus.userProgress.easyLevelSuper;
      return Math.trunc(actualEasyLevel/3);
  }

  generateArray(stars) {
    let resp = [];
    for(let index = 0; index < stars; ++index) {
        resp.push(1);
    }
    return resp;
  }

}
