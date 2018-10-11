import { CategoryProvider } from './../../providers/category/category';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core'; 
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
 
import { ProductsProvider } from '../../providers/product/product'; 
import {SuperMarketGame} from '../../shared/models/SupermarketGame'; 
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { SupermarketDragDropProvider } from '../../shared/providers/SupermarketDragDropProvider';
@IonicPage()
@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit, AfterViewInit, OnDestroy {
   
  game : SuperMarketGame;
  products: Array<{ id: number, title: string, image: string, state: boolean, categoryId: number}> = [];
  productsToBuy: any=[]; 
  productsToPlay: any[];
  imageSound: String;
  public selectorName: string;

  constructor(
    public navController: NavController, 
    public navParams: NavParams,
    public productsProvider:   ProductsProvider,
    public categoryProvider: CategoryProvider,
    private audioProvider: AudioProvider,
    private dragDropProvider: SupermarketDragDropProvider
  ) {
    this.selectorName = 'PRODUCT-' + Math.random();
    this.prepareGame();
    this.changeSoundIcon(); 
  }
   
  async prepareGame(){
    this.products = await this.productsProvider.getProducts(); 
    this.game = new SuperMarketGame(this.products);
    this.game.buildProducts(8,6);
    this.productsToBuy=this.game.ProductsToBuy; 
    this.productsToPlay=this.game.ProductsToPlay; 
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
  ionViewDidLoad() {  
    this.changeSoundIcon(); 
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

  popPage(){
    this.navController.pop();
  }

}
