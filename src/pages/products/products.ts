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

  products: Array<{ id: number, title: string, image: string, categoryId: number }> = [];
  numberOfProducts: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
    this.products = FakeListProducts.getProducts().reverse();
    this.numberOfProducts = this.products.length;
  }
  
  deleteListOfProducts() {
    FakeListProducts.deleteAllProducts();
    this.products = FakeListProducts.getProducts();
    this.numberOfProducts = this.products.length;
  }
  
  onClickDeleteList(){
    let alert = this.alertCtrl.create({
      title: 'Borrar toda la lista',
      message: '¿Quieres borrar toda la lista de productos?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            console.log(FakeProducts.getProducts());
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
    this.numberOfProducts = this.products.length;
  }

  onClickDeleteAProduct(product,indexOfProduct){ 
    FakeListProducts.removeProduct(indexOfProduct);
    FakeProducts.addProduct(product);
    this.numberOfProducts = this.products.length;
  }
  
  goToProducts() {
    this.navCtrl.pop();
  }
}
