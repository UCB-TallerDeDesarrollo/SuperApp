import { LoadingPage } from './../loading/loading';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginStatus } from './../../providers/login/LoginStatus';


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
  private lastNav:NavController;
  private level:number;
  public cantStars: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.lastNav=navParams.get("lastNav");
    this.level=navParams.get("level");
    this.navCtrl=this.lastNav;

    if (this.level >= 1 && this.level < 16) {
      let actualEasyLevel=LoginStatus.userProgress.easyLevel;
      this.cantStars = Math.trunc(actualEasyLevel/3);
    } else if (this.level >= 16 && this.level < 31) {
      let actualMediumLevel=LoginStatus.userProgress.mediumLevel-16;
      this.cantStars=Math.trunc(actualMediumLevel/3);
    } else if (this.level >= 31 && this.level < 125) {
      let actualHardLevel=LoginStatus.userProgress.hardLevel-31;
      this.cantStars=Math.trunc(actualHardLevel/19);
    } else {
      let actualExtremeLevel=LoginStatus.userProgress.extremeLevel-125;
      this.cantStars=Math.trunc(actualExtremeLevel/19);
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LevelCompletePage');
  }
  nextLevel(){
    this.viewCtrl.dismiss();
    this.navCtrl.push(LoadingPage, {lastNav:this.navCtrl, level:this.level, typeOfGame:'words'});
    this.navCtrl.remove(this.navCtrl.length()-1);
  }

  generateArray(stars) {
    let resp = [];
    for(let index = 0; index < stars; ++index) {
        resp.push(1);
    }
    return resp;
  }
}
