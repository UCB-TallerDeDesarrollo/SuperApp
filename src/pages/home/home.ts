import { WordPage } from './../word/word';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(platform: Platform, public navCtrl: NavController, private screenOrientation: ScreenOrientation) {
    
    platform.ready().then(() => {
      if (platform.is('cordova')){
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
    
   }).catch(err=>{
     console.log('Error while loading platform', err);
   });
    
  }
  
  pushPageList(){
    this.navCtrl.push(ListaPage);
    
  }
  pushPageWord(){
    this.navCtrl.push(WordPage);
  }

}
