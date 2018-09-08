import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';

import { FakeProducts } from '../../providers/FakeService/FakeProducts';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage implements OnInit, OnDestroy, AfterViewInit {
  
  actualSelectedElement:any;
  actualSelectedContainer:any;
  count: number;
  products: Array<{id: number, title: string, image: string}> = [];

  constructor(public navCtrl: NavController, private dragulaService: DragulaService) {
    this.products = FakeProducts.getProducts();
    this.count = 0;
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
      el.remove();
    });

  }

  pushProducts(){
    this.navCtrl.push(ProductsPage);
  }
}
