import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
//import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the CreateProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {
  
  base64Image: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public productProvider: ProductProvider,
              public categoryProvider: CategoryProvider/*,
              public camera: Camera*/) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
  }
/*
  accessGallery() {
    this.camera
  }
*/
}
