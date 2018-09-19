import { LoadingPage } from './../loading/loading';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-select-level',
  templateUrl: 'select-level.html',
})
export class SelectLevelPage {
  public level:number;
  private lastNav:NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.level=this.navParams.get("level");
    this.lastNav=this.navParams.get("lastNav");
  }
  goToLevel()
  {
    this.navCtrl.push(LoadingPage, {level:this.level});
    this.viewCtrl.dismiss();
    this.lastNav.pop();
  }
  ionViewDidLoad() {
    
  }

}
