import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';

import { DataBaseService } from '../../providers/database-service/database-service';
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {
  

  products:any;
  constructor(public navCtrl: NavController) {
    this.products=DataBaseService.getProducts();
  }

  pushProducts(){
    this.navCtrl.push(ProductsPage);
  }

 
}
