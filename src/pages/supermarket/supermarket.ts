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
@IonicPage()
@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
   
  game : SuperMarketGame;
  products: Array<Product> = [];
  productsToBuy: any=[]; 
  productsToPlay: any[];
  imageSound: String;
  carImage: String;
  public selectorName: string;
  public productsList: string[] = [];
  public countOfProducts: number;
  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public productsProvider:   ProductsProvider,
    public categoryProvider: CategoryProvider,
    public modalController:ModalController,
    private audioProvider: AudioProvider,
    private dragDropProvider: SupermarketDragDropProvider,
    private platform: Platform,
    private supermarketDifficulty: SupermarketDifficultyProvider
  ) {
    this.selectorName = 'PRODUCT-' + Math.random();
    this.countOfProducts = 0;
    this.carImage="assets/imgs/"+this.countOfProducts+".png";
    this.prepareGame();
    this.changeSoundIcon();
  }

  async prepareGame(){
    let level: number = this.navParams.get('level') || 1; 
   
    this.supermarketDifficulty.updateLastLevel(level); 
    this.products = await this.productsProvider.getProducts();
    this.game = new SuperMarketGame(this.products,level);
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

  public showEndView(): void {

    this.game.addPoint();
   
    this.audioProvider.playCorrectLetterSound();
    this.carImage="assets/imgs/"+this.countOfProducts+".png";
    
    if(this.game.isGameOver()) {
     
      this.supermarketDifficulty.saveProgressByLevel(this.game.Level);
      this.audioProvider.playLevelCompleteSound();
      this.showModalWin();
    }
    
  }

  public showModalWin(): void {
    const levelCompleteModal = this.modalController.create(SupermarketLevelCompletePage, {level: this.game.Level + 1, lastNav:this.navController});
    levelCompleteModal.present();
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
