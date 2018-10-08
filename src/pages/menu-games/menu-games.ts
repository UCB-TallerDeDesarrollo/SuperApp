import { SupermarketPage } from '../supermarket/supermarket'; 
import { Component } from '@angular/core';
import { SelectDifficultyPage } from '../select-difficulty/select-difficulty';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { ListaPage } from '../lista/lista';

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
  constructor(public navController: NavController, public navParams: NavParams, private audioProvider: AudioProvider) {
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

    pushPageWord(){
        this.navController.push(SelectDifficultyPage);
    }

    pushPageSupermarket(){
      this.navController.push(SupermarketPage);
    }

    popPage(){
        this.navController.pop();
    }
    pushPageList(){
      this.navController.push(ListaPage);    
    }
}
