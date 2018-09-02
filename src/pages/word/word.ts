import { ProductManager } from './Managers/ProductManager';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ColorsManager } from './Managers/ColorsManager';

@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})

export class WordPage {
  product:string;
  color:string;
  image_route:string;
  constructor(public navCtrl: NavController) {
    this.product=ProductManager.get_product();
    this.color=ColorsManager.get_color_style();
    this.image_route="assets/imgs/Products/"+this.product+".jpg";
  }
}
