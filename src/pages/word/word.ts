import { LoadingPage } from './../loading/loading';
import { LevelCompletePage } from './../level-complete/level-complete';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { SortWordGame } from '../../shared/models/sortWordGame.model';
import { ArrayColorProvider } from '../../shared/services/ColorService';
import { ProductProvider } from '../../shared/providers/ProductProvider';

@Component({
    selector: 'page-word',
    templateUrl: 'word.html'
})

export class WordPage implements OnInit, AfterViewInit, OnDestroy {

    game            : SortWordGame;
    backgroundColor : string;
    
    actualSelectedElement   : any;  // DRAGULAR NEEDED
    actualSelectedContainer : any;  // DRAGULAR NEEDED
    recentlyMove   : boolean;       // DRAGULAR NEEDED
    subs : Subscription = new Subscription(); // DRAGULAR NEEDED
    selectorName : string = 'LETTER-' + Math.random(); // DRAGULAR

    constructor(
        private navController    : NavController,
        private dragulaService   : DragulaService,
        private modalController  : ModalController,
        private productsProdiver : ProductProvider,
        private colorService     : ArrayColorProvider
    ) {
        this.prepareGame();
        this.recentlyMove = false;
        this.game.buildLetters(this.generateLettersWithColor());
    }

    generateLettersWithColor() {
        let response : any = [];
        for (let letter of this.game.ResponseWord) {
            response[letter] = this.colorService.getRandomColor();
        }
        return response;
    }

    private prepareGame() {
        this.game = new SortWordGame(this.productsProdiver.getRandomProduct());
        this.backgroundColor = this.colorService.getRandomBackgroundColor();
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

}
