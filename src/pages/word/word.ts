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
    let letters = this.product.toUpperCase().split('');
    let letters_sorted: any = [];

    for (let letter of letters) {
      letters_sorted.push({
        letter: letter,
        color: this.getRandomColor()
      });
    }

    for (let e of letters_sorted) {
      console.log(e);
    }
  }

  getRandomColor() {
    var color = "";

    for (var i = 0; i < 3; ++i) {
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }

    return color;
  }

}


