import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';
import { FakeProducts } from '../../providers/FakeService/FakeProducts';
import { FakeListProducts } from '../../providers/FakeService/FakeListProducts';
import { DragulaService } from 'ng2-dragula';
import { CreateProductPage } from '../create-product/create-product';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
  viewProviders: [DragulaService]
})
export class ListaPage implements OnInit, AfterViewInit {
  
  path_images = '../../assets/imgs/Products/';
  actualSelectedElement:any;
  actualSelectedContainer:any;
  products: Array<{id: number, title: string, image: string}> = [];
  quantityproductsString:string;
  quantityOfProducts: number;

  constructor(public navCtrl: NavController, private dragulaService: DragulaService) {
    this.products = FakeProducts.getProducts();
    this.quantityOfProducts = FakeListProducts.getQuantityOfProducts();
    this.quantityproductsString = this.quantityOfProducts.toString();
  }

  ionViewDidEnter() {
    this.quantityOfProducts = FakeListProducts.getQuantityOfProducts();
    this.quantityproductsString = this.quantityOfProducts.toString();
  }

  ngOnInit() {
    this.dragulaService.createGroup("PRODUCT", {
      revertOnSpill: false,
      moves: (element, container, handle) => {
        return !(container.id==='ignore-item');
      },
      accepts: (element, target, source, sibling) => {
        if(!target.classList.contains('objetive-container')) {
          return false;
        }
        return true;
      }
    });
      
  }

  ngAfterViewInit() {
    this.dragulaService.drop("PRODUCT").subscribe(({ el, target, source, sibling }) => {
      let product_id = +(el.id.split("-")[1]);
      let product = FakeProducts.getProductById(product_id);
      FakeListProducts.addProduct(product);
      this.quantityOfProducts = FakeListProducts.getQuantityOfProducts();
      this.quantityproductsString = this.quantityOfProducts.toString();
      el.remove();
      FakeProducts.removeProduct(this.products.indexOf(product));
    });
  }

  pushProducts(){
    this.navCtrl.push(ProductsPage);
  }

  pushProduct() {
    this.navCtrl.push(CreateProductPage);
  }

  goToRoot() {
    this.navCtrl.pop();
  }
}
