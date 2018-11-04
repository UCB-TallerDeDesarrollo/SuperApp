import { CategoryProvider } from './../../providers/category/category';
import { Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked } from '@angular/core'; 
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular'; 
import { ProductsProvider } from '../../providers/product/product'; 
import {SuperMarketGame} from '../../shared/models/SupermarketGame'; 
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { SupermarketDragDropProvider } from '../../shared/providers/SupermarketDragDropProvider';
import { SupermarketLevelCompletePage } from './../supermarket-level-complete/supermarket-level-complete';
import { LevelCompletePage } from './../level-complete/level-complete';
import { Product } from '../../entities/product';
import { SupermarketDifficultyProvider } from '../../shared/providers/SupermarketDifficultyProvider';
import { SelectLevelPage } from './../select-level/select-level';
import { Login } from '../../providers/login/Login';

@IonicPage()
@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
   
  game : SuperMarketGame;
  level: number;
  products: Array<Product> = [];
  productsToBuy: any=[]; 
  productsToPlay: any[];
  imageSound: String;
  carImage: String;
  public selectorName: string;
  public productsList: string[] = [];
  public countOfProducts: number;

  public textClass: boolean = true;
  public imageClass: boolean = true;
  
  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public productsProvider:   ProductsProvider,
    public categoryProvider: CategoryProvider,
    public modalController:ModalController,
    private audioProvider: AudioProvider,
    private dragDropProvider: SupermarketDragDropProvider,
    private platform: Platform,
    private supermarketDifficulty: SupermarketDifficultyProvider,
    private login:Login
  ) {
    this.selectorName = 'PRODUCT-' + Math.random();
    this.countOfProducts = 0;
    this.carImage="assets/imgs/"+this.countOfProducts+".png";
    this.prepareGame();
    this.changeSoundIcon();
  }

  async prepareGame(){
    this.level = this.navParams.get('level') || 1;
    this.supermarketDifficulty.updateLastLevel(this.level); 
    if((this.level >= 16 && this.level < 31) || this.level >= 46) {
      this.textClass = false;
    }
    if(this.level >= 31) {
      this.imageClass = false;
    }
    this.products = await this.productsProvider.getProducts();
    this.game = new SuperMarketGame(this.products,this.level); 
    this.game.buildProducts();
    this.productsToBuy = this.game.ProductsToBuy;
    for(let index = 0; index < this.productsToBuy.length; ++index) {
      this.productsList.push(`play-${this.productsToBuy[index].title}`);
    }
    this.productsToPlay = this.game.ProductsToPlay;
  } 

  public stopSound(){
    this.audioProvider.changeState();
    this.changeSoundIcon();
  }

  public changeLevel(){
      const changeLevel = this.modalController.create(
        SelectLevelPage, 
        {
            level    : this.game.Level, 
            lastNav  : this.navController, 
            maxLevel : 60,
            gamePage : this,
            typeOfGame: "supermarket"                
        }
    );
    changeLevel.onDidDismiss(
        ()=>{
            this.changeSoundIcon();
        }
    );
    changeLevel.present();
  }

  public async showEndView() {

    this.game.addPoint();
   
    this.audioProvider.playCorrectLetterSound();
    this.carImage="assets/imgs/"+this.countOfProducts+".png";
    
    if(this.game.isGameOver()) {
     
      //this.supermarketDifficulty.saveProgressByLevel(this.game.Level);
      await this.login.saveProgressSuper(this.game.Level);
      this.audioProvider.playLevelCompleteSound();
      this.showModalWin();
    }
    
  }

  public showModalWin(): void {
    if(this.game.Level<60){
      const levelCompleteModal = this.modalController.create(SupermarketLevelCompletePage, {level: this.game.Level + 1, lastNav:this.navController});
      levelCompleteModal.present();
    }else{
      this.navController.pop();
    }
  }

  private changeSoundIcon(){
    if(this.audioProvider.isMuted()){
      this.imageSound="assets/imgs/soundoffdark.png";
    }
    else{
      this.imageSound="assets/imgs/soundondark.png";
    }
  }

  public getProductsList(): string[] {
    return this.productsList;
  }

  ionViewDidLoad() {
    this.changeSoundIcon();
  }

  ngOnInit(): void {
    this.dragDropProvider.initialize(this.selectorName, this);
  }

  ngAfterViewInit(): void {
    this.dragDropProvider.startEvents(this.selectorName, this);
  }

  ngAfterViewChecked(): void {
    const HEIGHT_WINDOW = this.platform.height();
    const HEIGHT_BAR = 78;
    const PADDING = 32;
    const HEIGHT_CONTAINER = document.getElementById('high_container').offsetHeight;
    let height = HEIGHT_WINDOW - HEIGHT_BAR - PADDING - HEIGHT_CONTAINER;
    document.getElementById('carrito').setAttribute('style', `height: ${height}px`);
  }

  ngOnDestroy(): void { 
    this.dragDropProvider.finalize(this.selectorName);
  } 

}
