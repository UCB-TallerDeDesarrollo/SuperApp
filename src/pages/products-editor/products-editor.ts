import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Platform } from 'ionic-angular';
import { Product } from '../../entities/product';
import { CreateProductPage } from '../create-product/create-product';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@IonicPage()
@Component({
  selector: 'page-products-editor',
  templateUrl: 'products-editor.html',
})
export class ProductsEditorPage implements OnDestroy{

  products: Array<Product>;

  constructor(private platform: Platform, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public productProvider: ProductProvider, 
              public categoryProvider: CategoryProvider, 
              private screenOrientation: ScreenOrientation) {
    platform.ready()
    .then(() => {
      if (platform.is('cordova')){
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
    }).catch(err=> {
      console.log('Error while loading platform', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsEditorPage');
    this.productProvider.getProductsByCategory(this.navParams.data.data).then(products => {
      this.products = products;
    }).catch(error =>{
      console.log(error);
    });
  }

  ngOnDestroy(){
    if (this.platform.is('cordova')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
  }

  showProducts(){
    console.log(this.products);
  }

  pushCreateProduct(){
    this.navCtrl.push(CreateProductPage, { data: this.navParams.data.data });
  }
}
