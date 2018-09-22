import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
export class ProductsEditorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsEditorPage');
  }

}
