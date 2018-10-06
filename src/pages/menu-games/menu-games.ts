import { Component } from '@angular/core';
import { SelectDifficultyPage } from '../select-difficulty/select-difficulty';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AudioProvider } from '../../shared/providers/AudioProvider';
/**
 * Generated class for the MenuGamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-menu-games',
    templateUrl: 'menu-games.html',
})
export class MenuGamesPage {

  private imageSound:String;
  constructor(public navCtrl: NavController, public navParams: NavParams, private audioProvider: AudioProvider) {
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

    pushPageWord(){
        this.navCtrl.push(SelectDifficultyPage);
    }

    popPage(){
        this.navCtrl.pop();
    }
}
