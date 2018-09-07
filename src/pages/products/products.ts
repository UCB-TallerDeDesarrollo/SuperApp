import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  products: Array<{id: number, title: string, image: string,state:number}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
    this.products = FakeProducts.getProductsInShoppingCar();
    console.log(this.products);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  
  setProductsInListToStore(){ 
    FakeProducts.setStateOfSomeProducts(this.products,0);
    FakeProducts.updateProducts(this.products);
  } 
  
  deleteListOfProducts(){
    this.setProductsInListToStore()
  }
  
  onClickDeleteList(){
    let alert = this.alertCtrl.create({
      title: 'Borrar toda la lista',
      message: '¿Quieres borrar toda la lista de productos?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.deleteListOfProducts();
            this.products=[];
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
  
  onClickDeleteAProduct(product,index){
    //let productToDelete = [product];
    //console.log(productToDelete);  
    this.products.splice(index,1);

  }
}
