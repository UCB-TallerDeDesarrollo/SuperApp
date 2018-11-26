import { UserProvider } from './../../providers/user/user';
import { Letter } from './../../interfaces/letter';
import { LoginStatus } from './../../providers/login/LoginStatus';
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
import { User } from '../../entities/user';
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
    public isDisabled      :boolean;

    constructor(
        public navController       : NavController,
        private modalController    : ModalController,
        private productsProdiver   : ProductProvider,
        private colorService       : ColorProvider,
        private dragDropProvider   : WordDragDropProvider,
        private audioProvider      : AudioProvider,
        private navParams          : NavParams,
        private login              : Login,
        private productProdiver    : ProductsProvider,
        private userProvider       : UserProvider
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
        this.isDisabled = false;
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
            let user: User = await this.userProvider.getUserByUsername(LoginStatus.username);
            await this.productProdiver.getProductsByUserId(user.id).then(products => {
                if(products.length == 0) {
                    let product: Product = this.productsProdiver.getProductOfActualLevel(level);
                    this.game.setElements(product, level);
                }
                else {
                    let randomPosition = Math.floor(Math.random() * products.length);
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
            await this.login.saveProgress(this.game.Level, false);
            setTimeout(() => {
                this.audioProvider.playLevelCompleteSoundsAndShowModal(this.game.ResponseWord, this);
            }, 800);
        }
    }

    public showModalWin(): void {
        const levelCompleteModal = this.modalController.create(LevelCompletePage, {level: this.game.Level + 1, lastNav:this.navController,maxLevel:200});
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
                this.coins=LoginStatus.userProgress.coins;
            }
        );
        changeLevel.present();
    }

    public stopSound(){
        this.audioProvider.changeState();
        this.changeSoundIcon();
    }
    public getFirstLetterAvailable(){
        let availableLetter = "";
        let sortWord = [];
        for (let i =0 ;i<this.game.SortedWord.length; i++){
            sortWord.push(this.game.SortedWord[i].letter);
        }
        let b = sortWord.toString();
        for (let i =0; i<this.game.MessyWord.length; i++){
            if(b.includes(this.game.MessyWord[i].letter)){
                availableLetter = this.game.MessyWord[i].letter;
                break;
            }
        }
        return availableLetter;
    }
    public efect(word: string){
        let searched = this.getFirstLetterAvailable();
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
            this.audioProvider.playPronunciationOfTheProductName(this.game.ResponseWord)
        }, 4000);
        this.audioProvider.playLevelCompleteSound()
    }

    public playPronunciationOfTheProductName() {
        this.audioProvider.playPronunciationOfTheProductName(this.game.ResponseWord);
    }
   
    public playPronunciationOfTheLetter(letter: string): void {
        this.audioProvider.playPronunciationOfTheProductName(letter.toLowerCase());
    }
    public async downgradeCoins(){
        await this.login.updateCoins();
    }
    
    public reduceCoins(){
        if(this.coins >= 10){
            this.isDisabled=true;
            this.downgradeCoins();
            this.coins=this.coins-10;
            this.efect(this.game.MessyWord);
            
        }
         
    }
}
