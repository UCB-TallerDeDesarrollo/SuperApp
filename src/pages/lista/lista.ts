import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';

import { FakeProducts } from '../../providers/FakeService/FakeProducts';
import { DataBaseService } from '../../providers/database-service/database-service';
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {
  
  products:any;
  cantproducts:string;
  
  constructor(public navCtrl: NavController) {
    this.products=DataBaseService.getProducts();
    this.cantproducts='' + this.products.length;
  }

  pushProducts(){
    this.navCtrl.push(ProductsPage);
  }

}
