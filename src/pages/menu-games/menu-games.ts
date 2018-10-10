import { SupermarketPage } from '../supermarket/supermarket'; 
import { Component } from '@angular/core';
import { SelectDifficultyPage } from '../select-difficulty/select-difficulty';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { ListaPage } from '../lista/lista';
import { Category } from '../../entities/category';
import { Product } from '../../entities/product';
import { Categories } from '../../providers/FakeService/Categories';
import { CategoryProvider } from '../../providers/category/category';
import { FakeProducts } from '../../providers/FakeService/FakeProducts';
import { ProductsProvider } from '../../providers/product/product';


@IonicPage()
@Component({
    selector: 'page-menu-games',
    templateUrl: 'menu-games.html',
})
export class MenuGamesPage {

  private imageSound:String;
  constructor(public navController: NavController, 
              public navParams: NavParams, 
              private audioProvider: AudioProvider,
              public productsProvider: ProductsProvider, 
              public categoryProvider: CategoryProvider,
          ) {
    this.changeSoundIcon();
  }
  ionViewDidEnter() { 
    this.changeSoundIcon(); 
  }

  
  stopSound(){
    this.audioProvider.changeState();
    this.changeSoundIcon();
  }

  changeSoundIcon(){
    if(this.audioProvider.isMuted()){
      this.imageSound="assets/imgs/soundoff.png";
    }
    else{
      this.imageSound="assets/imgs/soundon.png";
    }
  }

    pushPageWord(){
        this.navController.push(SelectDifficultyPage);
    }

    pushPageSupermarket(){
      this.navController.push(SupermarketPage);
    }

    popPage(){
        this.navController.pop();
    }
    pushPageList(){
      this.navController.push(ListaPage);    
    }

  
  async databaseInitializer() {
    const count_product = await this.productsProvider.countProducts();
    const count_category = await this.categoryProvider.countCategories();
    if(count_category == 0) {
      let categories = Categories.getCategories();
      for(const c in categories) {
        let category = new Category();
        category.name = categories[c].name;
        await this.categoryProvider.saveCategory(category);
      }
      if(count_product < 58) {
        let products = FakeProducts.getProducts()
        for (const p in products) {
          let product = new Product();
          product.image = products[p].image;
          product.state = true;
          product.title = products[p].title;
          product.category = await this.categoryProvider.getCategoryById(products[p].categoryId);
          await this.productsProvider.saveProduct(product);
        }
      }
    }
  }

  ionViewDidLoad() {
    this.databaseInitializer();
  }
}
