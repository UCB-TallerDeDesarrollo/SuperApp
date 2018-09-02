import { ProductManager } from './productManager';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})

export class WordPage {
  product:string;
  constructor(public navCtrl: NavController) {
    this.product=ProductManager.get_product();
  }
}
