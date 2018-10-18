import { ViewUserPage } from './../view-user/view-user';
import { LoginStatus } from './../../providers/login/LoginStatus';
import { WordPage } from './../word/word';
import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
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
import { UserProvider } from '../../providers/user/user';
import { UserController } from '../../providers/user/UserController';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public imageSound:String;
  public iconLeft:string;
  public iconTop:string;
  private loged_items:any;
  private unloged_items:any;
  constructor(public userCtrl: UserController,platform: Platform, public navCtrl: NavController, private screenOrientation: ScreenOrientation,private audioProvider: AudioProvider, public toastCtrl:ToastController, public alertCtrl:AlertController) {
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
    this.userCtrl.changeLoginIcons();
  }
  
  show(): any {
    this.navCtrl.push(ViewUserPage);
  }
  stopSound(){
        this.audioProvider.changeState();
    this.changeSoundIcon();
  }
  login()
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

  create() {
    this.navCtrl.push(CreateUserPage);
  }

  edit() {
    this.navCtrl.push(EditUserPage);
  }

  delete() {
    console.log('Delete precionado');
  }

  logout() {
    LoginStatus.setLogout();
    var toast=this.toastCtrl.create({
      message:"Sesion finalizada",
      duration:3000,
      position: 'bottom'
    });
    toast.present();
    this.changeLoginIcons();
  }

}
