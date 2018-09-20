import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../entities/product';
import { ProductProvider } from '../../providers/product/product';
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
  productForm: FormGroup;
  products: Product[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public productProvider: ProductProvider) {
    /*this.productForm = this.formBuilder.group({
      title: [''],
      image: [''],
      state: ['']
    });*/


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
  }

}
