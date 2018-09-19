import { LoadingPage } from './../loading/loading';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-select-level',
  templateUrl: 'select-level.html',
})
export class SelectLevelPage {
  public level:number;
  public actualLevel:number;
  private lastNav:NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.level=this.navParams.get("level");
    this.lastNav=this.navParams.get("lastNav");
    this.actualLevel=this.level;
    this.navCtrl=this.lastNav;
  }
  goToLevel()
  {
    this.viewCtrl.dismiss();
    this.navCtrl.push(LoadingPage, {lastNav:this.navCtrl});
    this.navCtrl.remove(this.navCtrl.length()-1);
  }
  ionViewDidLoad() {
    
  }
  next()
  {
    this.level++;
  }
  previus()
  {
    this.level--;
    if (this.level<1)
    {
      this.level=1;
    }

    
  }
}
