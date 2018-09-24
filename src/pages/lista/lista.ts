import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';
import { FakeProducts } from '../../providers/FakeService/FakeProducts';
import { FakeListProducts } from '../../providers/FakeService/FakeListProducts';
import { DragulaService } from 'ng2-dragula';
import { Categories } from '../../providers/FakeService/Categories';
import { ProductProvider } from '../../providers/product/product';
import { Product } from '../../entities/product';
import { Category } from '../../entities/category';
import { CategoryProvider } from '../../providers/category/category';
import { ProductsEditorPage } from '../products-editor/products-editor';

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
  products: Array<{id: number, title: string, image: string, categoryId: number}> = [];
  categories: Array<{id: number, name: string}>=[];
  selectedCategory: {id: number, name: string};
  quantityproductsString:string;
  quantityOfProducts: number;

  constructor(public navCtrl:           NavController, 
              private dragulaService:   DragulaService, 
              public productProvider:   ProductProvider, 
              public categoryProvider:  CategoryProvider) {
    this.selectedCategory=Categories.getCategoryById(this.defaultCategoryId); 
    categoryProvider.getCategories()
    .then(categories => {
      this.categories = categories;
    })
    .catch(error => {
      console.log(error);
    });
    productProvider.getProductsByCategory(this.defaultCategoryId)
    .then(products => {
      this.products=products;
    })
    .catch(error => {
      console.log(error);
    });
    
    this.quantityOfProducts = FakeListProducts.getQuantityOfProducts();
    this.quantityproductsString = this.quantityOfProducts.toString();
  }

  chargeProductsOfCategory(categoryId: number){
    this.productProvider.getProductsByCategory(categoryId)
    .then(products => {
      this.products=products;
    })
    .catch(error => {
      console.log(error);
    });
  }

  ionViewDidEnter() { 
    this.quantityOfProducts = FakeListProducts.getQuantityOfProducts();
    this.quantityproductsString = this.quantityOfProducts.toString();
    this.chargeProductsOfCategory(this.selectedCategory.id);
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
      let product = FakeProducts.getProductById(product_id);
      FakeListProducts.addProduct(product);
      this.quantityOfProducts = FakeListProducts.getQuantityOfProducts();
      this.quantityproductsString = this.quantityOfProducts.toString();
      el.remove();
      FakeProducts.removeProduct(product);
    });
  }

  pushProducts(){
    this.navCtrl.push(ProductsPage);
  }

  pushProduct(category_id: any) {
    this.navCtrl.push(ProductsEditorPage, { data: category_id });
  }

  goToRoot() {
    this.navCtrl.pop();
  }
  
  onSelectCategory(category){ 
    this.selectedCategory=category; 
    this.products=FakeProducts.getProductsByCategory(category.id)
  }

  async databaseInitializer() {
    const count_product = await this.productProvider.countProducts();
    const count_category = await this.categoryProvider.countCategories();
    if(count_category < 4) {
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
          await this.productProvider.saveProduct(product);
        }
      }
    }
  }

  ionViewDidLoad() {
    this.databaseInitializer();
  }
}
