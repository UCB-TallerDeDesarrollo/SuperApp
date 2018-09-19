import { LoadingPage } from './../loading/loading';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-select-level',
  templateUrl: 'select-level.html',
})
export class SelectLevelPage {
  public level:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.level=this.navParams.get("level");
  }
  goToLevel()
  {
    this.viewCtrl.dismiss();
    this.navCtrl.push(LoadingPage, this.level);
  }
  ionViewDidLoad() {
    
  }

}
