import { SelectLevelPage } from './../select-level/select-level';
import { LevelCompletePage } from './../level-complete/level-complete';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { SortWordGame } from '../../shared/models/SortWordGame.model';
import { ColorProvider } from '../../shared/providers/ColorProvider';
import { ProductProvider } from '../../shared/providers/ProductProvider';
import { WordDragDropProvider } from '../../shared/providers/WordDragDropProvider';
import { AudioProvider } from '../../shared/providers/AudioProvider';
@Component({
    selector: 'page-word',
    templateUrl: 'word.html'
})
export class WordPage implements OnInit, AfterViewInit, OnDestroy {

    public game            : SortWordGame;
    public backgroundColor : string;
    public selectorName    : string;
    public level           : number;
    private imageSound     :String;

    constructor(
        public navController     : NavController,
        private modalController  : ModalController,
        private productsProdiver : ProductProvider,
        private colorService     : ColorProvider,
        private dragDropProvider : WordDragDropProvider,
        private audioProvider    : AudioProvider,
        private navParams        : NavParams
    ) {
        this.prepareGame();
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
    }

    public showEndView(): void {
        this.game.addCount();
        if(this.game.isGameOver()) {
            this.audioProvider.playPronunciationOfTheProductName(this.game.Product.Title);
            this.audioProvider.playLevelCompleteSound();
            this.showModalWin();
        }
        else {
            this.audioProvider.playCorrectLetterSound();
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
                maxLevel : this.productsProdiver.getQuantityOfProducts()
            }
        );
        changeLevel.present();
    }

   

    public stopSound(){
        this.audioProvider.changeState();
        this.changeSoundIcon();
    }

    private changeSoundIcon(){
        if(this.audioProvider.isMuted()){
          this.imageSound="assets/imgs/soundoffdark.png";
        }
        else{
          this.imageSound="assets/imgs/soundondark.png";
        }
    }

    public playPronunciationOfTheProductName() {
        this.audioProvider.playPronunciationOfTheProductName(this.game.Product.Title);
    }
}
