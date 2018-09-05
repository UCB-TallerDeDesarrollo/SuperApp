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
  letter_response: any = [];
  color:string;
  image_route:string;
  actualSelectedElement:any;
  actualSelectedContainer:any;
  recentlyMove:boolean;
  count: number;

  constructor(public navCtrl: NavController, private dragulaService: DragulaService) {
    this.product = ProductManager.get_product();
    this.color = ColorsManager.get_color_style();
    this.image_route = `/assets/imgs/Products/${this.product.toLowerCase()}.jpg`;
    this.recentlyMove = false;
    let letters = this.product.toUpperCase().split('');
    let letters_sorted: any = [];
    let letters_cloned: any = [];
    this.count = 0;
    do {

      this.letters_color = [];
      for (let letter of letters) {
        letters_sorted.push({
          letter: letter,
          color: this.getRandomColor(),
          name: `letter-${letter}`
        });
      }

      letters_cloned = letters_sorted.map(data => ({letter: data.letter, color: data.color, name: data.name}));
      let index = 0;
      while (letters_sorted.length > 0) {
        let data: any = ArrayManager.get_random_element(letters_sorted);
        this.letters_color.push({
          letter: data.letter,
          color: data.color,
          name: `letter-${data.letter}`
        });
        letters_sorted.splice(letters_sorted.indexOf(data), 1);
      }
    } while (JSON.stringify(letters_cloned) === JSON.stringify(this.letters_color));
    this.letter_response = letters_cloned;
  }

  ngOnInit() {
    this.dragulaService.createGroup('LETTER', {
      revertOnSpill: false,
      moves: (el, container, handle) => {
        return !(container.children.length > 0 && container.children[0].classList.contains('no-move'));
      },
      accepts: (el, target, source, sibling) => {
        if(!target.classList.contains('objetive-container')) {
          return false;
        }
        if(target.children.length > 0) {
          return false;
        }
        if(target.classList[0] !== source.classList[0]) {
          return false;
        }
        return true;
      }
    });
  }

  ngOnDestroy() {
    this.dragulaService.destroy('LETTER');
  }

  ngAfterViewInit() {
    const marginLeft : number = 4;

    this.dragulaService.drag('LETTER').subscribe(({ name, el, source }) => {
      this.actualSelectedContainer = source;
    });

    this.dragulaService.drop('LETTER').subscribe(({ el, target, source, sibling }) => {
      el.setAttribute('style', `top: 0px;left: 0px;border: initial;background-color: initial;`);
      el.classList.add('no-move');
      this.recentlyMove = true;
      this.showEndView();
    });

    this.dragulaService.dragend('LETTER').subscribe(({ name, el }) => {
      if(!this.recentlyMove) {
        let posLeft = parseFloat(this.actualSelectedElement.style.left) - parseFloat(this.offset(this.actualSelectedContainer).left) - marginLeft;
        let posTop = parseFloat(this.actualSelectedElement.style.top) - parseFloat(this.offset(this.actualSelectedContainer).top);
        el.setAttribute('style', `top: ${posTop}px;left: ${posLeft}px;`);  
      }
      this.recentlyMove = false;
    });

    this.dragulaService.cloned('LETTER').subscribe(({ clone, original, cloneType }) => {
      this.actualSelectedElement = clone;
    });

  }

  getRandomColor() {
    let color = '#';

    for (let i = 0; i < 3; ++i) {
      let part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : '0' + part;
    }

    return color;
  }


  offset(el) {
    let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  showEndView() {
    ++this.count;
    if(this.count >= this.letter_response.length) {
      console.log('GANASTE');
      location.reload();
    }
  }

}
