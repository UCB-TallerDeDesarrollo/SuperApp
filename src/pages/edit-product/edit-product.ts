import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Product } from '../../entities/product';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  product = new Product;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public productProvider: ProductProvider, 
              public categoryProvider: CategoryProvider) {
    console.log(navParams.data.data);
    this.productProvider.getProductById(navParams.data.data)
    .then(product => {
      this.product = product;
      console.log(JSON.stringify(this.product));
    }).catch(error => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

}
