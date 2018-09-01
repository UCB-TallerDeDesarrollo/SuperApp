import { WordPage } from './../word/word';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListaPage } from '../lista/lista';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  pushPageList(){
    this.navCtrl.push(ListaPage);
  }
  pushPageWord(){
    this.navCtrl.push(WordPage);
  }

}
