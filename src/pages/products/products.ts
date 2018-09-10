import { FakeProducts } from './../../providers/FakeService/FakeProducts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { FakeListProducts } from '../../providers/FakeService/FakeListProducts'; 


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  products: Array<{id: number, title: string, image: string}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
    this.products = FakeListProducts.getProducts().reverse();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  } 
  
  deleteListOfProducts() {
    FakeListProducts.deleteAllProducts();
    this.products = FakeListProducts.getProducts();
  }
  
  onClickDeleteList(){
    let alert = this.alertCtrl.create({
      title: 'Borrar toda la lista',
      message: '¿Quieres borrar toda la lista de productos?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            FakeProducts.addManyProducts(this.products)
            this.deleteListOfProducts();
          }
        },
        {
          text: 'No',
          role: 'no',
          handler: () => {
            console.log('no clicked');
          }
        }
      ]
    });
    alert.present();
  }

  onClickDeleteAProduct(product,indexOfProduct){ 
    console.log(product);    
    FakeListProducts.removeProduct(indexOfProduct);
    FakeProducts.addProduct(product);
  }
}
