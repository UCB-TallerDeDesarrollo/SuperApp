import { WordPage } from './../word/word';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SmartAudio } from '../../providers/smart-audio/smart-audio';
import { MenuGamesPage } from './../menu-games/menu-games';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(platform: Platform, public navCtrl: NavController, private screenOrientation: ScreenOrientation, public smartAudio: SmartAudio) {

    platform.ready().then(() => {
      if (platform.is('cordova')){
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        
      }
   }).catch(err=>{
     console.log('Error while loading platform', err);
   });
   
  }
  ionViewDidEnter(){
    this.smartAudio.play('mainSong');
  }
  playSound() {
    this.smartAudio.play('mainSong');
  }
  stopSound(){
    this.smartAudio.stop('mainSong');
  }
  changeState()
  {
    this.smartAudio.changeState();
  }
  pushPageList(){
    this.navCtrl.push(ListaPage);    
  }

  pushPageWord(){
    this.navCtrl.push(WordPage);
  }

  pushPageMenuGames(){
    this.navCtrl.push(MenuGamesPage);
  }

}
