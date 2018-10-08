import { WordPage } from './../word/word';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { MenuGamesPage } from './../menu-games/menu-games';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private imageSound:String;

  constructor(platform: Platform, public navCtrl: NavController, private screenOrientation: ScreenOrientation,private audioProvider: AudioProvider) {
    platform.ready().then(() => {
      if (platform.is('cordova')){
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        
      }
   }).catch(err=>{
     console.log('Error while loading platform', err);
   });
    this.changeSoundIcon(); 
  }


  stopSound(){
        this.audioProvider.changeState();
    this.changeSoundIcon();
  }

  changeSoundIcon(){
    if(this.audioProvider.isMuted()){
      this.imageSound="assets/imgs/soundoff.png";
    }
    else{
      this.imageSound="assets/imgs/soundon.png";
    }
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
  pushPageWord(){
    this.navCtrl.push(SelectDifficultyPage);
  }

}
