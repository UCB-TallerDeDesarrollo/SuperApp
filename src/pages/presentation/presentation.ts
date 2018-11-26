import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { PresentationProvider } from '../../providers/presentation/presentation';

/**
 * Generated class for the PresentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  public counter: number = 10;

  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController
  ) {
    platform.ready().then(async () => {
      if(localStorage['firstTimePresentation'] != 'TRUE') {
        localStorage['firstTimePresentation'] = 'TRUE';
        this.executeTemporize();
      }
      else {
        this.viewCtrl.dismiss();
      }
    });
  }

  public async executeTemporize() {
    document.getElementById('start').classList.remove('presentation-no-visible');
    let myVar = setInterval(() => {
      this.counter--;
      if(this.counter <= 0) {
        document.getElementById('start').classList.add('presentation-no-visible');
        this.viewCtrl.dismiss();
        clearInterval(myVar);
      }
    }, 1000);
  }

  endTemporize() {
    this.counter = 0;
  }
}
