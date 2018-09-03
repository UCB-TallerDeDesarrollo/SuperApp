import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FakeProducts } from '../../providers/FakeService/FakeProducts';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  products: Array<{id: number, title: string, image: string}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.products = FakeProducts.getProducts();
    console.log(this.products);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

}
