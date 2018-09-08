import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';
import { FakeProducts } from '../../providers/FakeService/FakeProducts';
import { FakeListProducts } from '../../providers/FakeService/FakeListProducts';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage implements OnInit, OnDestroy, AfterViewInit {
  
  path_images = '../../assets/imgs/Products/';
  actualSelectedElement:any;
  actualSelectedContainer:any;
  products: Array<{id: number, title: string, image: string}> = [];

  constructor(public navCtrl: NavController, private dragulaService: DragulaService) {
    this.products = FakeProducts.getProducts();
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

  ngOnDestroy() {
  }

  ngAfterViewInit() { 
    this.dragulaService.drop("PRODUCT").subscribe(({ el, target, source, sibling }) => {
      let product_id = +(el.id.split("-")[1]);
      let product = FakeProducts.getProductById(product_id-1);
      FakeListProducts.addProduct(product);
      el.remove();
    });
  }

  pushProducts(){
    this.navCtrl.push(ProductsPage, {message:"Hello"});
  }
}
