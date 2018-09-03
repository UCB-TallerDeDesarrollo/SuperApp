import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {
  
  constructor(public navCtrl: NavController) {

  }

  pushProducts(){
    this.navCtrl.push(ProductsPage);
  }

}
