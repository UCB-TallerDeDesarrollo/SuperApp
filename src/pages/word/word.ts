import { UserProvider } from './../../providers/user/user';
import { User } from './../../entities/user';
import { SelectLevelPage } from './../select-level/select-level';
import { LevelCompletePage } from './../level-complete/level-complete';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { SortWordGame } from '../../shared/models/SortWordGame.model';
import { ColorProvider } from '../../shared/providers/ColorProvider';
import { ProductProvider } from '../../shared/providers/ProductProvider';
import { WordDragDropProvider } from '../../shared/providers/WordDragDropProvider';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Product } from '../../shared/models/Product.model';
import { Login } from '../../providers/login/Login';
import { ProductsProvider } from '../../providers/product/product';
@Component({
    selector: 'page-word',
    templateUrl: 'word.html'
})
export class WordPage implements OnInit, AfterViewInit, OnDestroy {

    public game            : SortWordGame;
    public backgroundColor : string;
    public selectorName    : string;
    public imageSound      : string;
    public coins           : number;

    constructor(
        public navController       : NavController,
        private modalController    : ModalController,
        private productsProdiver   : ProductProvider,
        private colorService       : ColorProvider,
        private dragDropProvider   : WordDragDropProvider,
        private audioProvider      : AudioProvider,
        private navParams          : NavParams,
        private login              : Login,
        private productProdiver    : ProductsProvider
    ) {
        this.prepareGame();
        this.changeSoundIcon();
      
    }

    ionViewDidEnter() { 
        this.changeSoundIcon(); 
    }
    coinsOfUser()
    {
       this.login.userProvider.getAmountOfCoins().then((value)=>this.coins = value)
    }
    private generateLettersWithColor() {
        let response: any = [];
        for (let letter of this.game.ResponseWord) {
            if (this.game.Level >= 31) {
                response[letter] = '#000000';
            } else {
                response[letter] = this.colorService.getRandomColor();
            }
        }
        return response;
    }

    private async prepareGame() {
        await this.prepareLevel();
        this.coinsOfUser();
        this.backgroundColor = this.colorService.getRandomBackgroundColor();
        this.game.buildLetters(this.generateLettersWithColor());
    }
 
    private generateSelectorCode() {
        return 'LETTER-' + Math.random();
    }

    private async prepareLevel() {
        let level: number = this.navParams.get('level');
        this.game = new SortWordGame(null, -1);
        if(level < 125) {
            let product: Product = this.productsProdiver.getProductOfActualLevel(level);
            this.game.setElements(product, level);
        }
        else {
            await this.productProdiver.getProducts().then(products => {
                if(products.length == 0) {
                    let product: Product = this.productsProdiver.getProductOfActualLevel(level);
                    this.game.setElements(product, level);
                }
                else {
                    let randomPosition = Math.floor(Math.random() * products.length - 1);
                    console.log(products);
                    let product: Product = Product.createProduct(
                        products[randomPosition].id,
                        products[randomPosition].title,
                        products[randomPosition].image,
                        level
                    );
                    this.game.setElements(product, level);
                }
            });
        }
    }

    public async showEndView() {
        this.game.addCount();
        if(this.game.isGameOver()) {
            await this.login.saveProgress(this.game.Level);
            setTimeout(() => {
                this.playLevelCompleteSoundAndPronunciationOfTheProductName();
            }, 250);
            this.showModalWin();
        }
    }

    public showModalWin(): void {
        const levelCompleteModal = this.modalController.create(LevelCompletePage, {level: this.game.Level + 1, lastNav:this.navController});
        levelCompleteModal.present();
    }

    ngOnInit(): void {
        this.selectorName = this.generateSelectorCode();
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
                level    : this.game.Level, 
                lastNav  : this.navController, 
                maxLevel : this.productsProdiver.getQuantityOfProducts(),
                gamePage : this,
                typeOfGame: "words"                
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
    public efect(word: string){
        let searched = this.game.MessyWord[0].letter;
        let aux = document.getElementsByClassName("objetive-container");
        let found;
        for (var i = 0; i < aux.length; i++) {
            if ((aux[i].classList[0].trim() == ("letter-" + searched).trim()) && (aux[i].textContent == "")){
                found = aux[i];
                break;
            }
        }
        let aux2 = document.getElementsByClassName("wordsss");
        let found2;
        for (var j = 0; j < aux.length; j++) {
            if (aux2[j].classList[0].trim()== ("letter-" + searched).trim()){
                found2 = aux2[j];
                break;
            }
        }
        found2.classList.add('help-coin');
        found.classList.add('help-coin');

    }
    public removeFromMessy(letterM :string){
        /*let i = 0;
        for (let letra of this.game.MessyWord){
            if (letra.letter.trim() == letterM.trim()){
                this.game.MessyWord.splice(i,1);
                break;
            }
            i = i +1;
        }*/
        this.game.MessyWord.splice(letterM, 1);
    }

    public changeSoundIcon(){
        if(this.audioProvider.isMuted()){
          this.imageSound = 'assets/imgs/soundOffDark.png';
        }
        else{
          this.imageSound = 'assets/imgs/soundOnDark.png';
        }
    }

    public playLevelCompleteSoundAndPronunciationOfTheProductName() {
        setTimeout(() => {
            this.audioProvider.playPronunciationOfTheProductName(this.game.ResponseWord);
        }, 4000);
        this.audioProvider.playLevelCompleteSound();
    }

    public playPronunciationOfTheProductName() {
        this.audioProvider.playPronunciationOfTheProductName(this.game.ResponseWord);
    }
   
    public playPronunciationOfTheLetter(letter: string): void {
        this.audioProvider.playPronunciationOfTheProductName(letter);
    }
    public async downgradeCoins(){
        await this.login.updateCoins();
    }
    public reduceCoins(){
        if(this.coins >= 10){
            this.downgradeCoins();
            this.coins=this.coins-10;
            this.efect(this.game.MessyWord);
        }
         
    }
}
