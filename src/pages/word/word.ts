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
  messy_letters: any = [];
  sorted_letters: any = [];
  letters_color: any = [];
  color:string;
  image_route:string;
  actualSelectedElement:any;
  actualSelectedContainer:any;
  colors: any = [];

  constructor(public navCtrl: NavController, private dragulaService: DragulaService) {
    this.product = ProductManager.get_product();
    this.color = ColorsManager.get_color_style();
    this.image_route = `/assets/imgs/Products/${this.product.toLowerCase()}.jpg`;
    let letters = this.product.toUpperCase().split('');
    let auxilary_letters: any = [];

    this.colors.push("#B73D19");
    this.colors.push("#E7E41C");
    this.colors.push("#4CD10A");
    this.colors.push("#23A547");
    this.colors.push("#24AD81");
    this.colors.push("#2473AD");
    this.colors.push("#2433AD");
    this.colors.push("#1C818F");
    this.colors.push("#280D97");
    this.colors.push("#8C1D87");

    this.generateLettersWithColor();

    do {

      this.messy_letters = [];

      for (let letter of letters) {
        auxilary_letters.push({
          letter: letter,
          color: this.letters_color[letter],
        });
      }

      this.sorted_letters = auxilary_letters.map(data => ({letter: data.letter, color: data.color}));
      let index = 0;
      while (auxilary_letters.length > 0) {
        let data: any = ArrayManager.get_random_element(auxilary_letters);
        this.messy_letters.push({
          letter: data.letter,
          color: data.color,
          index: `letter-${index++}`
        });
        auxilary_letters.splice(auxilary_letters.indexOf(data), 1);
      }
    } while (JSON.stringify(this.sorted_letters) === JSON.stringify(this.messy_letters));
  }

  ngOnInit() {
    for (let letter of this.messy_letters) {
      this.dragulaService.createGroup(letter.index, {
        revertOnSpill: false
      });
    }
  }

  ngOnDestroy() {
    for (let letter of this.messy_letters) {
      this.dragulaService.destroy(letter.index);
    }
  }

  ngAfterViewInit() {
    const marginLeft : number = 4;
    for (let letter of this.messy_letters) {

      this.dragulaService.drag(letter.index).subscribe(({ name, el, source }) => {
        this.actualSelectedContainer = source;
      });
  
      this.dragulaService.dragend(letter.index).subscribe(({ name, el }) => {
        let posLeft = parseFloat(this.actualSelectedElement.style.left) - parseFloat(this.offset(this.actualSelectedContainer).left) - marginLeft;
        let posTop = parseFloat(this.actualSelectedElement.style.top) - parseFloat(this.offset(this.actualSelectedContainer).top);
        el.setAttribute('style', `top: ${posTop}px;left: ${posLeft}px;`);
      });

      this.dragulaService.cloned(letter.index).subscribe(({ clone, original, cloneType }) => {
        this.actualSelectedElement = clone;
      });
    }
  }

  getRandomColor() {
    let color = '#';

    for (let i = 0; i < 3; ++i) {
      let part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : '0' + part;
    }

    return color;
  }

  generateLettersWithColor() {
    for (let letter of this.product) {
      this.letters_color[letter] = ArrayManager.get_random_element(this.colors);
    }
  }

  offset(el) {
    let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

}
