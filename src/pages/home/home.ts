import { LoginStatus } from './../../providers/login/LoginStatus';
import { WordPage } from './../word/word';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { MenuGamesPage } from './../menu-games/menu-games';
import { SelectDifficultyPage } from '../select-difficulty/select-difficulty';
import { ProductsEditorPage } from '../products-editor/products-editor';
import { CreateUserPage } from '../create-user/create-user';
import { UserLoginPage } from '../user-login/user-login';
import { EditUserPage } from '../edit-user/edit-user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private imageSound:String;
  
  public loged=LoginStatus.logged;
  public iconLeft:string;

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
  ionViewDidEnter() { 
    this.changeSoundIcon();
    this.changeLoginIcons();
  }
  changeLoginIcons(): any {
      if (LoginStatus.logged)
      {
        this.iconLeft="settings";
      }
      else{
        this.iconLeft="log-in";
      }
  }
  action()
  {
    if (LoginStatus.logged)
    {
      this.toEdit();
    }
    else{
      this.toLogin();
    }
  }
  stopSound(){
        this.audioProvider.changeState();
    this.changeSoundIcon();
  }
  toLogin()
  {
    this.navCtrl.push(UserLoginPage);
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

  pushPageWordGame(){
    this.navCtrl.push(SelectDifficultyPage);
  }

  pushEditorProducts() {
    this.navCtrl.push(ProductsEditorPage);
  }

  pushPageCreateUser() {
    this.navCtrl.push(CreateUserPage);
  }
  toEdit()
  {
    this.navCtrl.push(EditUserPage);

  }
 
}
