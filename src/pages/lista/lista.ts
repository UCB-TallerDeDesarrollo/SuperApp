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
  recentlyMove:boolean;
  count: number;
  products: Array<{id: number, title: string, image: string}> = [];

  constructor(public navCtrl: NavController, private dragulaService: DragulaService) {
    this.products = FakeProducts.getProducts();
    this.recentlyMove = false;
    this.count = 0;
  }

  ngOnInit() {
    console.log("ngOnInit()");
    this.dragulaService.createGroup("PRODUCT", {
      revertOnSpill: false,
      moves: (element, container, handle) => {
        console.log("class--> "+container.children[0].classList);
        console.log("length--> "+container.children.length);
        return !(container.children.length > 0 && container.children[0].classList.contains('no-move'));
      },
      accepts: (element, target, source, sibling) => {
        console.log(target.classList.contains('objetive-container'));
        if(!target.classList.contains('objetive-container')) {
          return false;
        }
        if(target.children.length > 0) {
          return false;
        }
        return true;
      }
    });
  }

  ngOnDestroy() {
    console.log("ngOnDestroy()");
  }

  ngAfterViewInit() { 
    console.log("ngAfterViewInit()");

    this.dragulaService.drag('PRODUCT').subscribe(({ name, el, source }) => {
      console.log("SUBSCRIBE 1--> "+source);
      this.actualSelectedContainer = source;
    });

    this.dragulaService.drop("PRODUCT").subscribe(({ el, target, source, sibling }) => {
      console.log("SUBSCRIBE 2--> "+el);
    });

    this.dragulaService.dragend('PRODUCT').subscribe(({ name, el }) => {
      console.log("SUBSCRIBE 3--> "+el.children);
    });

    this.dragulaService.cloned('PRODUCT').subscribe(({ clone, original, cloneType }) => {
      console.log("SUBSCRIBE 4--> "+clone);
      this.actualSelectedElement = clone;
    });

  }

  pushProducts(){
    this.navCtrl.push(ProductsPage);
  }

  offset(el) {
    let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  showEndView() {
    console.log(this.count);
    ++this.count;
    //if(this.count >= this.letter_response.length) {
      console.log('GANASTE');
    //}
  }


}
