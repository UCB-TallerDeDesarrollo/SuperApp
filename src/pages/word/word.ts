import { ProductManager } from './Managers/ProductManager';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ColorsManager } from './Managers/ColorsManager';
import { ArrayManager } from './Managers/ArrayManager';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})

export class WordPage {

  product:string;
  letters_color: any = [];
  color:string;
  image_route:string;

  constructor(public navCtrl: NavController, private dragulaService: DragulaService) {
    this.product = ProductManager.get_product();
    this.color = ColorsManager.get_color_style();
    this.image_route = `/assets/imgs/Products/${this.product.toLowerCase()}.jpg`;
    let letters = this.product.toUpperCase().split('');
    let letters_sorted: any = [];
    let letters_cloned: any = [];

    this.dragulaService.createGroup("LETTERS", {
      removeOnSpill: false
    });

    this.dragulaService.drag("LETTERS").subscribe(({ name, el, source }) => {
      console.log(name);
      console.log(el);
      console.log(source);
    })

    do {
      this.letters_color = [];
      
      for (let letter of letters) {
        letters_sorted.push({
          letter: letter,
          color: this.getRandomColor()
        });
      }

      letters_cloned = letters_sorted.map(data => ({letter: data.letter, color: data.color}));
      
      while (letters_sorted.length > 0) {
        let data: any = ArrayManager.get_random_element(letters_sorted);
        this.letters_color.push({
          letter: data.letter,
          color: data.color
        });
        letters_sorted.splice(letters_sorted.indexOf(data), 1);
      }
    } while (JSON.stringify(letters_cloned) === JSON.stringify(this.letters_color));
  }

  getRandomColor() {
    var color = "#";

    for (var i = 0; i < 3; ++i) {
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }

    return color;
  }

}
