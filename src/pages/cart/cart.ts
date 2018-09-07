import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBaseService } from '../../providers/database-service/database-service';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  products:any;
  cantproducts:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.products=DataBaseService.getProducts();
    this.cantproducts= this.products.length;
  }

}
