import { CategoryProvider } from './../../providers/category/category';
import { Component, OnInit, AfterViewInit } from '@angular/core'; 
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
 
import { ProductsProvider } from '../../providers/product/product'; 
import {SuperMarketGame} from '../../shared/models/SupermarketGame'; 
import { AudioProvider } from '../../shared/providers/AudioProvider';
@IonicPage()
@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit, AfterViewInit{
   
  game : SuperMarketGame;
  products: Array<{ id: number, title: string, image: string, state: boolean, categoryId: number}> = [];
  productsToBuy: any=[]; 
  imageSound: String;
  constructor(
    public navController: NavController, 
    public navParams: NavParams,
    public productsProvider:   ProductsProvider,
    public categoryProvider: CategoryProvider,
    private audioProvider: AudioProvider
  ) { 
    this.prepareGame();
    this.changeSoundIcon(); 
  }
   
  async prepareGame(){
    this.products = await this.productsProvider.getProducts(); 
    this.game = new SuperMarketGame(this.products);
    this.game.buildProducts(8,6);  
    this.productsToBuy=this.game.ProductsToBuy;  
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
  }

  ngAfterViewInit(): void { 
  }

  popPage(){
    this.navController.pop();
  }

}
