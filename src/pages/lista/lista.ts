import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { FakeListProducts } from '../../providers/FakeService/FakeListProducts';
import { DragulaService } from 'ng2-dragula';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Category } from '../../entities/category';
import { Product } from '../../entities/product';
import { Categories } from '../../providers/FakeService/Categories';
import { CategoryProvider } from '../../providers/category/category';
import { FakeProducts } from '../../providers/FakeService/FakeProducts';
import { ProductsProvider } from '../../providers/product/product';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
  viewProviders: [DragulaService]
})
export class ListaPage implements OnInit, AfterViewInit {
  
  path_images = '../../assets/imgs/Products/';
  defaultCategoryId:number = 1;
  actualSelectedElement:any;
  actualSelectedContainer:any;
  products: Array<{ id: number, title: string, image: string, state: boolean, categoryId: number}> = [];
  categories: Array<{id: number, name: string}>=[];
  selectedCategory: {id: number, name: string};
  quantityproductsString:string;
  quantityOfProducts: number;
  imageSound: String;
  productPageIndex: number;
  categoriesPageIndex: number;
  onViewproducts: Array<{ id: number, title: string, image: string, state: boolean, categoryId: number}> = [];
  onViewcategories: Array<{id: number, name: string}>=[];
  ON_VIEW_LIST_LENGHT=12;
  ON_VIEW_CATEGORIES_LENGHT=4;

  constructor(
    public navCtrl:           NavController, 
    private dragulaService:   DragulaService, 
    public productsProvider:   ProductsProvider, 
    public categoryProvider:  CategoryProvider,
    private audioProvider: AudioProvider
  ) {
    this.productPageIndex=0;
    this.categoriesPageIndex=0;
    this.selectedCategory=Categories.getCategoryById(this.defaultCategoryId); 
    categoryProvider.getCategories()
    .then(categories => {
      this.categories = categories;
      this.chargeCategories();
    })
    .catch(error => {
      console.log(error);
    });
    productsProvider.getProductsByCategory(this.defaultCategoryId)
    .then(products => {
      this.products=products;
      this.chargeProducts();
    })
    .catch(error => {
      console.log(error);
    });
    
    this.quantityOfProducts = FakeListProducts.getQuantityOfProducts();
    this.quantityproductsString = this.quantityOfProducts.toString();
    this.changeSoundIcon();
  }

  chargeProductsOfCategory(categoryId: number){
    this.productsProvider.getProductsByCategory(categoryId)
    .then(products => {
      this.products=products;
      this.chargeProducts();
    })
    .catch(error => {
      console.log(error);
    });
  }

  chargeProducts(){
    let bound = this.productPageIndex+this.ON_VIEW_LIST_LENGHT;
    if(bound > this.products.length){
      bound = this.products.length;
    }
    this.onViewproducts = this.products.slice(this.productPageIndex, bound);
  }

  chargeCategories(){
    let bound = this.categoriesPageIndex+this.ON_VIEW_CATEGORIES_LENGHT;
    if(bound > this.categories.length){
      bound = this.categories.length;
    }
    this.onViewcategories = this.categories.slice(this.categoriesPageIndex, bound);
  }

  _chargeList(){

  }

  ionViewDidEnter() { 
    this.quantityOfProducts = FakeListProducts.getQuantityOfProducts();
    this.quantityproductsString = this.quantityOfProducts.toString(); 
    this.changeSoundIcon(); 
    this.productsProvider.getProductsByCategoryOnlyActive(this.selectedCategory.id)
    .then(products => {
      this.products = products;
      this.chargeProducts();
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.dragulaService.createGroup("PRODUCT", {
      revertOnSpill: false,
      moves: (element, container, handle) => {
        return (container.id !=='ignore-item');
      },
      accepts: (element, target, source, sibling) => {
        if(!target.classList.contains('objetive-container')) {
          return false;
        }
        return true;
      }
    });
      
  }

  ngAfterViewInit() {
    this.dragulaService.drop("PRODUCT").subscribe(({ el, target, source, sibling }) => {
      let product_id = + (el.id.split("-")[1]);
        let currentProduct = new Product;
        this.productsProvider.getProductById(product_id)
        .then( p => {
          currentProduct = p;
          FakeListProducts.addProduct({ 
            id: currentProduct.id, 
            title: currentProduct.title, 
            image: currentProduct.image, 
            categoryId: this.selectedCategory.id
          });
          p.state = false; 
          this.productsProvider.updateProduct(p)
          .then(response => {
            console.log(response);
            console.log("update succesfull");
            console.log("Deberia actualizar");
            this.onSelectCategory(this.selectedCategory);
          }).catch(error => {
            console.log(error);
            console.log("update failes");
          });
          this.quantityOfProducts = FakeListProducts.getQuantityOfProducts();
          this.quantityproductsString = this.quantityOfProducts.toString();
        }).catch(error => {
          console.log(error);
          console.log("get failed");
        });
      el.remove();
    });
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
  
  pushPageList(){
    this.navCtrl.push(ListaPage);    
  }

  pushProducts(){
    this.navCtrl.push(ProductsPage);
  }

  goToRoot() {
    this.navCtrl.pop();
  }

  nextProductPage(){
    this.productPageIndex+=this.ON_VIEW_LIST_LENGHT;
    if(this.productPageIndex>=this.products.length){
      this.productPageIndex=0;
    }
    this.chargeProducts();
  }

  nextCategoryPage(){
    this.categoriesPageIndex+=this.ON_VIEW_CATEGORIES_LENGHT;
    if(this.categoriesPageIndex>=this.categories.length){
      this.categoriesPageIndex=0;
    }
    this.chargeCategories();
  }

  onSelectCategory(category){ 
    this.selectedCategory = category;
    this.productsProvider.getProductsByCategoryOnlyActive(this.selectedCategory.id)
    .then(products => {
      this.products = products;
      this.productPageIndex=0;
      this.chargeProducts();
    }).catch(error => {
      console.log(error);
    });
  }
}