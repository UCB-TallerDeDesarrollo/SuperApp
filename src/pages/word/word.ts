import { SelectLevelPage } from './../select-level/select-level';
import { LoadingPage } from './../loading/loading';
import { LevelCompletePage } from './../level-complete/level-complete';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, Platform, NavParams } from 'ionic-angular';
import { SortWordGame } from '../../shared/models/sortWordGame.model';
import { ColorProvider } from '../../shared/providers/ColorProvider';
import { ProductProvider } from '../../shared/providers/ProductProvider';
import { WordDragDropProvider } from '../../shared/providers/WordDragDropProvider';

@Component({
    selector: 'page-word',
    templateUrl: 'word.html'
})
export class WordPage implements OnInit, AfterViewInit, OnDestroy {

    public game            : SortWordGame;
    public backgroundColor : string;
    public selectorName    : string;
    public level           : number;
    constructor(
        private navController    : NavController,
        private modalController  : ModalController,
        private productsProdiver : ProductProvider,
        private colorService     : ColorProvider,
        private dragDropProvider : WordDragDropProvider,
        private navParams        : NavParams
        
    ) {
        this.prepareGame();
        
    }

    private generateLettersWithColor() {
        let response: any = [];
        for (let letter of this.game.ResponseWord) {
            response[letter] = this.colorService.getRandomColor();
        }
        return response;
    }

    private prepareGame(): void {
        this.game = new SortWordGame(this.productsProdiver.getRandomProduct());
        this.selectorName = 'LETTER-' + Math.random();
        this.backgroundColor = this.colorService.getRandomBackgroundColor();
        this.game.buildLetters(this.generateLettersWithColor());
        this.level=this.navParams.get("level");
        if(this.level==undefined)
        {
            this.level=1;
        }
    }

    public showEndView(): void {
        this.game.addCount();
        if(this.game.isGameOver()) {
            this.showModalWin();
        }
    }

    public showModalWin(): void {
        let nextLevel:number=this.level+1;
        const levelCompleteModal = this.modalController.create(LevelCompletePage, {level: nextLevel, lastNav:this.navController});
        levelCompleteModal.present();
    }

    ngOnInit(): void {
        this.dragDropProvider.initialize(this.selectorName);
    }

    ngAfterViewInit(): void {
        this.dragDropProvider.startEvents(this.selectorName, this);
    }

    ngOnDestroy(): void {
        this.dragDropProvider.finalize(this.selectorName);
    }

    public changeLevel(){
        const changeLevel=this.modalController.create(SelectLevelPage, {level: this.level, lastNav: this.navController});   
        changeLevel.present();
    }
}
