import { SelectLevelPage } from './../select-level/select-level';
import { LevelCompletePage } from './../level-complete/level-complete';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { SortWordGame } from '../../shared/models/SortWordGame.model';
import { ColorProvider } from '../../shared/providers/ColorProvider';
import { ProductProvider } from '../../shared/providers/ProductProvider';
import { WordDragDropProvider } from '../../shared/providers/WordDragDropProvider';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { DifficultyProvider } from '../../shared/providers/DifficultyProvider';
@Component({
    selector: 'page-word',
    templateUrl: 'word.html'
})
export class WordPage implements OnInit, AfterViewInit, OnDestroy {

    public game            : SortWordGame;
    public backgroundColor : string;
    public selectorName    : string;
    public level           : number;
    public imageSound      : string;

    constructor(
        public navController       : NavController,
        private modalController    : ModalController,
        private productsProdiver   : ProductProvider,
        private colorService       : ColorProvider,
        private dragDropProvider   : WordDragDropProvider,
        private audioProvider      : AudioProvider,
        private navParams          : NavParams,
        private difficultyProvider : DifficultyProvider
    ) {
        this.prepareGame();
        this.changeSoundIcon();
    }

    ionViewDidEnter() { 
        this.changeSoundIcon(); 
    }
    
    private generateLettersWithColor() {
        let response: any = [];
        for (let letter of this.game.ResponseWord) {
            if (this.level >= 31) {
                response[letter] = '#000000';
            } else {
                response[letter] = this.colorService.getRandomColor();
            }
        }
        return response;
    }

    private prepareGame(): void {
        this.prepareLevel();
        this.game = new SortWordGame(this.productsProdiver.getProductOfActualLevel());
        this.selectorName = 'LETTER-' + Math.random();
        this.backgroundColor = this.colorService.getRandomBackgroundColor();
        this.game.buildLetters(this.generateLettersWithColor(), this.level);
    }

    private prepareLevel() {
        this.productsProdiver.setLevel(this.navParams.get('level'));
        this.level = this.productsProdiver.getActualLevel();
        this.difficultyProvider.updateLastLevel(this.getDifficultType(), this.level);
    }

    public showEndView(): void {
        this.game.addCount();
        if(this.game.isGameOver()) {
            this.difficultyProvider.saveProgressByLevel(this.getDifficultType(), this.level);
            setTimeout(() => {
                this.playPronunciationOfTheProductName();
            }, 250);
            this.showModalWin();
        }
    }

    public showModalWin(): void {
        this.productsProdiver.nextLevel();
        const levelCompleteModal = this.modalController.create(LevelCompletePage, {level: this.productsProdiver.getActualLevel(), lastNav:this.navController});
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
        const changeLevel = this.modalController.create(
            SelectLevelPage, 
            {
                level    : this.level, 
                lastNav  : this.navController, 
                maxLevel : this.productsProdiver.getQuantityOfProducts(),
                wordPage : this                
            }
        );
        changeLevel.onDidDismiss(
            ()=>{
                this.changeSoundIcon();
            }
        );
        changeLevel.present();
    }

    public stopSound(){
        this.audioProvider.changeState();
        this.changeSoundIcon();
    }

    public changeSoundIcon(){
        if(this.audioProvider.isMuted()){
          this.imageSound = "assets/imgs/soundOffDark.png";
        }
        else{
          this.imageSound = "assets/imgs/soundOnDark.png";
        }
    }

    public playPronunciationOfTheProductName() {
        this.audioProvider.playPronunciationOfTheProductName(this.game.ResponseWord);
    }
   
    public playPronunciationOfTheLetter(letter:string):void{
        this.audioProvider.playPronunciationOfTheProductName(letter);
    }

    public getDifficultType(): number {
        if(this.level >= 1 && this.level < 16) {
            return 0;
        }
        if(this.level >= 16 && this.level < 31) {
            return 1;
        }
        if(this.level >= 31 && this.level < 125) {
            return 2;
        }
        if(this.level >= 125) {
            return 3;
        }
        return -1;
    }
}
