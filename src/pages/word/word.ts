import { FakeProducts } from './../../providers/FakeService/FakeProducts';
import { ProductManager } from '../../Managers/ProductManager';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ColorsManager } from '../../Managers/ColorsManager';
import { ArrayManager } from '../../Managers/ArrayManager';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})

export class WordPage implements OnInit, AfterViewInit, OnDestroy {

  product:string;
  messy_letters: any = [];
  sorted_letters: any = [];
  letters_color: any = [];
  letter_response: any = [];
  color:string;
  image_route:string;
  actualSelectedElement:any;
  actualSelectedContainer:any;
  recentlyMove:boolean;
  count: number;
  colors: any = [];

  subs = new Subscription();

  selectorName : string = 'LETTER';

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private dragulaService: DragulaService) {
    let product_information=FakeProducts.get_random_product();
    this.product=product_information.title;
    //this.product = ProductManager.get_product();
    this.color = ColorsManager.get_color_style();
    this.image_route = product_information.image;
    this.recentlyMove = false;
    let letters = this.product.split('');
    this.count = 0;
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
          name: `letter-${letter}`
        });
      }

      this.sorted_letters = auxilary_letters.map(data => ({letter: data.letter, color: data.color, name: data.name}));
      while (auxilary_letters.length > 0) {
        let data: any = ArrayManager.get_random_element(auxilary_letters);
        this.messy_letters.push({
          letter: data.letter,
          color: data.color,
          name: `letter-${data.letter}`
        });
        auxilary_letters.splice(auxilary_letters.indexOf(data), 1);
      }
    } while (JSON.stringify(this.sorted_letters) === JSON.stringify(this.messy_letters));
    this.letter_response = this.sorted_letters;
  }

  ngOnInit() {
    this.dragulaService.createGroup(this.selectorName, {
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
    console.log('SE DESTRUYO');
    this.subs.unsubscribe();
    this.dragulaService.destroy(this.selectorName);
  }

  ngAfterViewInit() {
    const marginLeft : number = 4;

    this.subs.add(this.dragulaService.drag(this.selectorName).subscribe(({ name, el, source }) => {
      this.actualSelectedContainer = source;
    }));

    this.subs.add(this.dragulaService.drop(this.selectorName).subscribe(({ el, target, source, sibling }) => {
      el.setAttribute('style', `top: 0px;left: 0px;border: initial;background-color: initial;`);
      el.classList.add('no-move');
      this.recentlyMove = true;
      this.showEndView();
    }));

    this.subs.add(this.dragulaService.dragend(this.selectorName).subscribe(({ name, el }) => {
      if(!this.recentlyMove) {
        let posLeft = parseFloat(this.actualSelectedElement.style.left) - parseFloat(this.offset(this.actualSelectedContainer).left) - marginLeft;
        let posTop = parseFloat(this.actualSelectedElement.style.top) - parseFloat(this.offset(this.actualSelectedContainer).top);
        el.setAttribute('style', `top: ${posTop}px;left: ${posLeft}px;`);  
      }
      this.recentlyMove = false;
    }));

    this.subs.add(this.dragulaService.cloned(this.selectorName).subscribe(({ clone, original, cloneType }) => {
      this.actualSelectedElement = clone;
    }));

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

  showEndView() {
    console.log(this.count);
    ++this.count;
    if(this.count >= this.letter_response.length) {
      console.log('GANASTE');
      //this.navCtrl.push(WordPage);
      //this.navCtrl.remove(this.navCtrl.length() - 1);
      const prontm = this.alertCtrl.create({
        'title': 'My first modal',
        'message': 'Ganaste :D'
      });
      prontm.present();
      //this.navCtrl.pop();
      //this.navCtrl.push(WordPage);
    }
  }
}
