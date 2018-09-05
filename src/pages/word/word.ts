import { ProductManager } from './Managers/ProductManager';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ColorsManager } from './Managers/ColorsManager';
import { ArrayManager } from './Managers/ArrayManager';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})

export class WordPage implements OnInit, AfterViewInit, OnDestroy {

  product:string;
  letters_color: any = [];
  color:string;
  image_route:string;
  actualSelectedElement:any;
  actualSelectedContainer:any;

  constructor(public navCtrl: NavController, private dragulaService: DragulaService) {
    this.product = ProductManager.get_product();
    this.color = ColorsManager.get_color_style();
    this.image_route = `/assets/imgs/Products/${this.product.toLowerCase()}.jpg`;
    let letters = this.product.toUpperCase().split('');
    let letters_sorted: any = [];
    let letters_cloned: any = [];

    do {

      this.letters_color = [];
      for (let letter of letters) {
        letters_sorted.push({
          letter: letter,
          color: this.getRandomColor(),
        });
      }

      letters_cloned = letters_sorted.map(data => ({letter: data.letter, color: data.color}));
      let index = 0;
      while (letters_sorted.length > 0) {
        let data: any = ArrayManager.get_random_element(letters_sorted);
        this.letters_color.push({
          letter: data.letter,
          color: data.color,
          index: `letter-${index++}`
        });
        letters_sorted.splice(letters_sorted.indexOf(data), 1);
      }
    } while (JSON.stringify(letters_cloned) === JSON.stringify(this.letters_color));
  }

  ngOnInit() {
    for (let letter of this.letters_color) {
      this.dragulaService.createGroup(letter.index, {
        revertOnSpill: false
      });
    }
  }

  ngOnDestroy() {
    for (let letter of this.letters_color) {
      this.dragulaService.destroy(letter.index);
    }
  }

  ngAfterViewInit() {
    for (let letter of this.letters_color) {

      this.dragulaService.drag(letter.index).subscribe(({ name, el, source }) => {
        this.actualSelectedContainer = source;
      });
  
      this.dragulaService.dragend(letter.index).subscribe(({ name, el }) => {
        let posLeft = parseFloat(this.actualSelectedElement.style.left) - parseFloat(this.offset(this.actualSelectedContainer).left);
        let posTop = parseFloat(this.actualSelectedElement.style.top) - parseFloat(this.offset(this.actualSelectedContainer).top);
        el.setAttribute('style', `top: ${posTop}px;left: ${posLeft}px;`);
      });

      this.dragulaService.cloned(letter.index).subscribe(({ clone, original, cloneType }) => {
        this.actualSelectedElement = clone;
      });
    }
  }

  getRandomColor() {
    var color = "#";

    for (var i = 0; i < 3; ++i) {
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }

    return color;
  }


  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

}
