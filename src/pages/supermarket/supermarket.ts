import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { IonicPage, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AudioProvider } from '../../shared/providers/AudioProvider';
@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html'
})
export class SupermarketPage {
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        
    }
}