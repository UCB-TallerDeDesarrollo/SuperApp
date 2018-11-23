import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular'; 
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { MenuGamesPage } from './../menu-games/menu-games';
import { SelectDifficultyPage } from '../select-difficulty/select-difficulty';
import { ProductsEditorPage } from '../products-editor/products-editor';
import { AboutPage } from '../about/about';
import { SelectAvatarPage } from '../select-avatar/select-avatar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public imageSound:String;

  constructor(platform: Platform, public navCtrl: NavController, private screenOrientation: ScreenOrientation,private audioProvider: AudioProvider, public toastCtrl:ToastController, public alertCtrl:AlertController) {
    platform.ready().then(() => {
      if (platform.is('cordova')){
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        
      }
   }).catch(err=>{
     console.log('Error while loading platform', err);
   });
    this.changeSoundIcon(); 
    
  }
  ionViewDidEnter() {  
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
 
  pushPageMenuGames(){
    this.navCtrl.push(MenuGamesPage);
  }

  pushPageWordGame(){
    this.navCtrl.push(SelectDifficultyPage,{ typeOfGame: "words" });
  }

  pushEditorProducts() {
    this.navCtrl.push(ProductsEditorPage);
  }

  pushaboutPage(){
    this.navCtrl.push(AboutPage);
  }

}
