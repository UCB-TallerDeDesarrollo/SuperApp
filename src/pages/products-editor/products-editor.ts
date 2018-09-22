import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Product } from '../../entities/product';
import { CreateProductPage } from '../create-product/create-product';

/**
 * Generated class for the ProductsEditorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products-editor',
  templateUrl: 'products-editor.html',
})
export class ProductsEditorPage implements AfterViewInit{

  products: Array<Product>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider, public categoryProvider: CategoryProvider) { 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsEditorPage');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit ProductsEditorPage');
    this.productProvider.getProductsByCategory(this.navParams.data.data).then(products => {
      this.products = products;
    }).catch(error =>{
      console.log(error);
    });
  }

  showProducts(){
    console.log(this.products);
  }

  pushCreateProduct(){
    this.navCtrl.push(CreateProductPage, { data: this.navParams.data.data });
  }
}
