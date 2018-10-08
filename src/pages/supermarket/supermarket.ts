import { CategoryProvider } from './../../providers/category/category';
import { Component, OnInit, AfterViewInit } from '@angular/core'; 
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
 
import { ProductsProvider } from '../../providers/product/product'; 
import {SuperMarketGame} from '../../shared/models/SupermarketGame'; 

@IonicPage()
@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit, AfterViewInit{
   
  game : SuperMarketGame;
  products: Array<{ id: number, title: string, image: string, state: boolean, categoryId: number}> = [];
  productsToBuy: any=[]; 

  constructor(
    public navController: NavController, 
    public navParams: NavParams,
    public productsProvider:   ProductsProvider,
    public categoryProvider: CategoryProvider
  ) { 
    this.prepareGame();
  }
   
  async prepareGame(){
    this.products = await this.productsProvider.getProducts(); 
    this.game = new SuperMarketGame(this.products);
    this.game.buildProducts(8,6);  
    this.productsToBuy=this.game.ProductsToBuy;  
  } 
 

  ionViewDidLoad() {  
  }

  ngOnInit(): void { 
  }

  ngAfterViewInit(): void { 
  }

  popPage(){
    this.navController.pop();
  }

}
