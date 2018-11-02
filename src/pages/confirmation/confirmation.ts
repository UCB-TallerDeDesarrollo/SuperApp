import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {

  callback;
  message:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.callback=navParams.get("callback");
    this.message=navParams.get("message");
  }

  ionViewDidLoad() {
    
  }

  continue(){
    this.callback();
    this.navCtrl.pop();
  }

}
