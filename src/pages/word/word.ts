import { LoadingPage } from './../loading/loading';
import { LevelCompletePage } from './../level-complete/level-complete';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ColorsManager } from '../../Managers/ColorsManager';
import { ArrayManager } from '../../Managers/ArrayManager';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { SortWordGame } from '../../shared/models/sortWordGame.model';
import { ArrayProductProvider } from '../../providers/Array/ArrayProductProvider';

@Component({
    selector: 'page-word',
    templateUrl: 'word.html'
})

export class WordPage implements OnInit, AfterViewInit, OnDestroy {

    game : SortWordGame;
    
    messy_letters   : any = [];   // LETRAS DESORDENADAS
    sorted_letters  : any = [];   // LETRAS ORDENADAS
    
    color           : string;    // ESTABLECE EL COLOR DE FONDO
    
    actualSelectedElement   : any;  // DRAGULAR NEEDED
    actualSelectedContainer : any;  // DRAGULAR NEEDED
    recentlyMove   : boolean;       // DRAGULAR NEEDED
    subs : Subscription = new Subscription(); // DRAGULAR NEEDED
    selectorName : string = 'LETTER-' + Math.random(); // DRAGULAR NEEDED

    colors: any = [];      // ARRAY ESTATICO

    constructor(
        private navController    : NavController, 
        private dragulaService   : DragulaService, 
        private modalController  : ModalController,
        private productsProdiver : ArrayProductProvider
    ) {
        this.game = new SortWordGame();
        this.messy_letters = [];
        this.prepare_binding_items();
        let auxilary_letters: any = [];
        this.recentlyMove = false;
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
        let lettersColor = this.generateLettersWithColor();
        do {
            for (let letter of this.game.ResponseWord) {
                auxilary_letters.push({
                    letter: letter,
                    color: lettersColor[letter],
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
    }

    generateLettersWithColor() {
        let response : any = [];
        for (let letter of this.game.ResponseWord) {
            response[letter] = ArrayManager.get_random_element(this.colors);
        }
        return response;
    }

    private prepare_binding_items() {
        this.color = ColorsManager.get_color_style();
        this.game.Product = this.productsProdiver.get_random_product();
    }

    ngOnInit() : void {
        this.dragulaService.createGroup(this.selectorName, {
            revertOnSpill: true,
            moves: (el, container, handle) => {
                return !(container.children.length > 0 && container.children[0].classList.contains('no-move'));
            },
            accepts: (el, target, source, sibling) => {
                if(!target.classList.contains('objetive-container')) {
                    return false;
                }
                if(target.children.length > 0) {
                    return target.children[0].classList.contains('gu-transit');
                }
                if(target.classList[0] !== source.classList[0]) {
                    return false;
                }
                return true;
            }
        });
    }

    ngOnDestroy() : void {
        this.subs.unsubscribe();
        this.dragulaService.destroy(this.selectorName);
    }

    ngAfterViewInit() : void {
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

    offset(el) {
        let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    showEndView() : void {
        this.game.addCount();
        if(this.game.isGameOver()) {
            this.showModalWin();
        }
    }

    showModalWin() : void {
        const levelCompleteModal = this.modalController.create(LevelCompletePage);
        levelCompleteModal.onDidDismiss(data => {
            this.navController.push(LoadingPage, null, { animate: false });
            this.navController.remove(this.navController.length() - 1);
        });
        levelCompleteModal.present();
    }

}
