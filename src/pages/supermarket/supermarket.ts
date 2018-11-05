import { CategoryProvider } from './../../providers/category/category';
import { Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked } from '@angular/core'; 
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular'; 
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
import { Category } from '../../entities/category';

@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
   
  game : SuperMarketGame;
  level: number;
  products: Array<Product> = [];
  categories: Array<Category> = [];
  productsToBuy: any=[]; 
  productsToPlay: any[];
  imageSound: String;
  carImage: String;
  public selectorName: string;
  public productsList: string[] = [];
  public countOfProducts: number;
  ON_VIEW_LIST_LENGTH:number = 12;
  ON_VIEW_CATEGORIES_LENGTH:number = 3;
  productPageIndex: number=0;
  categoriesPageIndex: number=0;
  onViewProducts: Array<Product> = [];
  onViewCategories: Array<{id: number, name: string}>=[];
  defaultCategoryId:number=0;

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
    if(this.game.isAdvancedLevel){
      await this.chargeCategoriesGlobal();
    }
    else{
      this.onViewProducts=this.productsToPlay;
    }
  } 

  async chargeCategoriesGlobal(){
    for(let product of this.productsToPlay){
      let category_id=product.category_id;
      let categoryIndex=this.categories.findIndex((elem)=>{return elem.id===category_id;});
      if(categoryIndex>=0){
        this.categories[categoryIndex].addProduct(product);
      }
      else{
        let category=await this.categoryProvider.getCategoryById(category_id);
        category.addProduct(product);
        this.categories.push(category);
      }
    }
    this.chargeProducts();
    this.chargeCategories();
  }

  onSelectCategory(category){
    let category_id=category.id;
    this.defaultCategoryId=this.categories.findIndex((elem)=>{return elem.id===category_id;});
    this.productPageIndex = 0;
    this.chargeProducts();
  }

  chargeProducts(){
    let products=this.categories[this.defaultCategoryId].products;
    let bound = this.productPageIndex+this.ON_VIEW_LIST_LENGTH;
    if(bound > products.length){
      bound = products.length;
    }
    this.onViewProducts = products.slice(this.productPageIndex, bound);
  }

  chargeCategories(){
    let bound = this.categoriesPageIndex+this.ON_VIEW_CATEGORIES_LENGTH;
    if(bound > this.categories.length){
      bound = this.categories.length;
    }
    this.onViewCategories = this.categories.slice(this.categoriesPageIndex, bound);
  }

  nextProductPage(){
    this.productPageIndex+=this.ON_VIEW_LIST_LENGTH;
    if(this.productPageIndex>=this.products.length){
      this.productPageIndex=0;
    }
    this.chargeProducts();
  }

  nextCategoryPage(){
    this.categoriesPageIndex += this.ON_VIEW_CATEGORIES_LENGTH;
    if(this.categoriesPageIndex >= this.categories.length){
      this.categoriesPageIndex = 0;
    }
    this.chargeCategories();
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

  public async showEndView(element) {

    this.game.addPoint();
    this.removeProductByElement(element);
    this.audioProvider.playPronunciationOfTheProductName(this.getProductNameByElement(element));
    this.carImage="assets/imgs/"+this.countOfProducts+".png";
    if(this.game.isGameOver()) {
      //this.supermarketDifficulty.saveProgressByLevel(this.game.Level);
      await this.login.saveProgressSuper(this.game.Level);
      this.playLevelCompleteSoundAndPronunciationOfTheProductName(element);
      this.showModalWin();
    }  
  }

  private removeProductByElement(htmlElement){
    let htmlId=this.getHtmlId(htmlElement);
    let productId=this.getProductIdByHtmlId(htmlId);
    this.takeProductOut(productId);
  }

  private getHtmlId(htmlElement): string{
    return htmlElement.getAttribute('id');
  }

  private getProductIdByHtmlId(htmlId: string){
    let id=htmlId.split('-')[1];
    return id;
  }
  private getProductNameByElement(htmlElement){
    let title=htmlElement.querySelector('p').textContent;
    console.log(title);
    return title;
  }
  
  private takeProductOut(productId){
    for(let index=0; index<this.categories.length; index++){
      let category=this.categories[index];
      let productIndex=category.products.findIndex(product=> product.id==productId);
      if(productIndex>=0){
        category.products.splice(productIndex,1);
        if(category.products.length==0){
          this.categories.splice(index,1);
          this.defaultCategoryId=0;
          this.chargeCategories();
          this.chargeProducts();
        }
        break;
      }
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
      this.imageSound="assets/imgs/soundoff.png";
    }
    else{
      this.imageSound="assets/imgs/soundon.png";
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
    document.getElementById('carrito').setAttribute('style', `height: ${height + 40}px`);
  }
  public playPronunciationOfTheProductName(word:string) {
    this.audioProvider.playPronunciationOfTheProductName(word);
  }
  public playLevelCompleteSoundAndPronunciationOfTheProductName(element) {
    setTimeout(() => {
    this.playPronunciationOfTheProductName(this.getProductNameByElement(element));
    }, 4000);
    this.audioProvider.playLevelCompleteSound();
}
  ngOnDestroy(): void { 
    this.dragDropProvider.finalize(this.selectorName);
  } 

}
