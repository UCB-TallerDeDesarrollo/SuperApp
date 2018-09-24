import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Platform } from 'ionic-angular';
import { Product } from '../../entities/product';
import { CreateProductPage } from '../create-product/create-product';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { EditProductPage } from '../edit-product/edit-product';

@IonicPage()
@Component({
  selector: 'page-products-editor',
  templateUrl: 'products-editor.html',
})
export class ProductsEditorPage implements OnDestroy {

  products: Array<Product>;

  constructor(private platform: Platform, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public productsProvider: ProductsProvider, 
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
    this.productsProvider.getProductsByCategory(this.navParams.data.data).then(products => {
      this.products = products;
    }).catch(error =>{
      console.log(error);
    });
  }
  
  ionViewDidEnter() {
    this.productsProvider.getProductsByCategory(this.navParams.data.data).then(products => {
      this.products = products;
    }).catch(error =>{
      console.log(error);
    });
  }

  goToRoot(){
    if (this.platform.is('cordova')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    this.navCtrl.pop();
  }

  ngOnDestroy(){
    if (this.platform.is('cordova')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
  }

  pushCreateProduct(){
    this.navCtrl.push(CreateProductPage, { data: this.navParams.data.data });
  }

  editProduct(product_id: number){
    this.navCtrl.push(EditProductPage, {data: product_id, categoryId: this.navParams.data.data});
  }

  async changeState(product_id: number, product_state: boolean) {
    await this.productProvider.updateStateProduct(!product_state, product_id);
    this.navCtrl.pop();
    this.navCtrl.push(ProductsEditorPage, { data: this.navParams.data.data });
  }

}
