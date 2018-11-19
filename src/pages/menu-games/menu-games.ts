import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { SelectDifficultyPage } from '../select-difficulty/select-difficulty';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { ListaPage } from '../lista/lista';
import { CategoryProvider } from '../../providers/category/category';
import { ProductsProvider } from '../../providers/product/product';
import { Login } from '../../providers/login/Login';


@IonicPage()
@Component({
    selector: 'page-menu-games',
    templateUrl: 'menu-games.html',
})
export class MenuGamesPage {

  private imageSound:String;
  constructor(public navController: NavController,
              public navParams: NavParams,
              private audioProvider: AudioProvider,
              public productsProvider: ProductsProvider,
              public categoryProvider: CategoryProvider,
              public userProvide:UserProvider,
              public userProvider: UserProvider,
              public login: Login) {
    this.prepareAnonimusUser();
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

  pushPageSupermarket(){
    this.navController.push(SelectDifficultyPage,{ typeOfGame:"supermarket" });
  }

  popPage(){
      this.navController.pop();
  }

  pushPageList(){
    this.navController.push(ListaPage, { listId: -1 });
  }


  async prepareAnonimusUser() {
    await this.userProvider.prepareAnonimusUser();
    await this.login.loadingGameData();
  }


}
