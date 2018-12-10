import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  async ionViewDidLoad() {
  	await this.delay();
  	this.navCtrl.push(HomePage);  
  }

  delay() {
 	return new Promise(resolve => setTimeout(resolve, 5000));
  }
}
