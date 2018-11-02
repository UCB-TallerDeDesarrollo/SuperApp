import { ListProvider } from './../../providers/list/list';
import { ProductListProvider } from './../../providers/product-list/product-list';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { FakeListProducts } from '../../providers/FakeService/FakeListProducts';
import { DragulaService } from 'ng2-dragula';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Category } from '../../entities/category';
import { Product } from '../../entities/product';
import { Categories } from '../../providers/FakeService/Categories';
import { CategoryProvider } from '../../providers/category/category';
import { ProductsProvider } from '../../providers/product/product';
import { ProductList } from '../../entities/productList';
import { List } from '../../entities/list';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
  viewProviders: [DragulaService]
})
export class ListaPage implements OnInit, AfterViewInit {

  list = new List;
  path_images = '../../assets/imgs/Products/';
  defaultCategoryId:number = 1;
  actualSelectedElement:any;
  actualSelectedContainer:any;
  products: Array<Product> = [];
  categories: Array<Category> = [];
  selectedCategory: {id: number, name: string};
  imageSound: String;
  productPageIndex: number;
  categoriesPageIndex: number;
  productsOnList: Array<Product> = [];
  numberOfProductsOnList: number;
  onViewProducts: Array<Product> = [];
  onViewCategories: Array<{id: number, name: string}>=[];
  ON_VIEW_LIST_LENGTH = 12;
  ON_VIEW_CATEGORIES_LENGTH = 4;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dragulaService: DragulaService,
              public productsProvider: ProductsProvider,
              public categoryProvider: CategoryProvider,
              private audioProvider: AudioProvider,
              private alertCtrl: AlertController,
              public productListProvider: ProductListProvider,
              public listProvider: ListProvider) {
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
    productsProvider.getProductsByCategoryOnlyActive(this.defaultCategoryId)
    .then(products => {
      this.products = products;
      this.chargeProducts();
    })
    .catch(error => {
      console.log(error);
    });
    listProvider.getListById(this.navParams.get("listId"))
    .then(list => {
      this.list = list;
    }).catch(error => {
      console.error(error);
    });
    this.changeSoundIcon();
    this.reloadProductsOnList();
    this.chargeProducts();
  }

  chargeProducts(){
    let bound = this.productPageIndex+this.ON_VIEW_LIST_LENGTH;
    if(bound > this.products.length){
      bound = this.products.length;
    }
    this.onViewProducts = this.products.slice(this.productPageIndex, bound);
  }

  chargeCategories(){
    let bound = this.categoriesPageIndex+this.ON_VIEW_CATEGORIES_LENGTH;
    if(bound > this.categories.length){
      bound = this.categories.length;
    }
    this.onViewCategories = this.categories.slice(this.categoriesPageIndex, bound);
  }

  ionViewWillEnter() {
    this.listProvider.getListById(this.navParams.get("listId"))
    .then(list => {
      this.list = list;
    }).catch(error => {
      console.error(error);
    });
    this.reloadProductsOnList();
    this.initializerVariables();
    this.changeSoundIcon();
  }

  initializerVariables() {
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
      this.productsProvider.getProductById(product_id)
      .then(p => {
        let productListTemp = new ProductList();
        productListTemp.list_id = this.navParams.get("listId");
        productListTemp.product_id = p.id;
        this.productListProvider.saveProductList(productListTemp)
        .then(response => {
          if(response) this.reloadProductsOnList();
        }).catch(error => {
          console.error(error);
        });
        this.audioProvider.playPronunciationOfTheProductName(p.title);
        this.productsProvider.updateProduct(p)
        .then(response => {
          if(response) this.onSelectCategory(this.selectedCategory);
        }).catch(error => {
          console.log(error);
        });
        this.numberOfProductsOnList = this.productsOnList.length;
      }).catch(error => {
        console.log(error);
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
      this.imageSound="assets/imgs/soundoff.png";
    }
    else{
      this.imageSound="assets/imgs/soundon.png";
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

  onSelectCategory(category){
    this.selectedCategory = category;
    this.productsProvider.getProductsByCategoryOnlyActive(this.selectedCategory.id)
    .then(products => {
      this.products = products;
      this.productPageIndex = 0;
      this.chargeProducts();
    }).catch(error => {
      console.log(error);
    });
  }

  onClickDeleteList() {
    let alert = this.alertCtrl.create({
      title: 'Borrar toda la lista',
      message: '¿Quieres borrar toda la lista de productos?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.deleteListOfProducts();
          }
        },
        {
          text: 'No',
          role: 'no',
          handler: () => {
            console.log('no clicked');
          }
        }
      ]
    });
    alert.present();
  }

  onClickDeleteAProduct(product, indexOfProduct) {
    this.reloadProductsOnList();
    this.productsProvider.getProductsByCategoryOnlyActive(this.selectedCategory.id)
    .then(products => {
      this.products = products;
      this.chargeProducts();
    }).catch(error => {
      console.error(error);
    });
    this.productListProvider.deleteProductListByProductIdAndListId(product.id, this.navParams.get("listId"))
    .then(result => {
      if(!result) this.reloadProductsOnList();
    }).catch(error => {
      console.error(error);
    });
    this.products.push(product);
    this.products.sort(function (obj1, obj2) {
      return obj1.id - obj2.id;
    });
    this.numberOfProductsOnList = this.productsOnList.length;
  }

  deleteListOfProducts() {
    this.productListProvider.deleteProductListByListId(this.navParams.get("listId"))
    .then(result => {
      if(result) this.reloadProductsOnList();
    }).catch(error => {
      console.error(error);
    });
    this.productsProvider.getProductsByCategoryOnlyActive(this.selectedCategory.id)
    .then(products => {
      this.products = products;
    }).catch(error => {
      console.log(error);
    });
    this.reloadProductsOnList();
    this.numberOfProductsOnList = 0;
  }

  public playPronunciationOfTheProductName(word:string) {
    this.audioProvider.playPronunciationOfTheProductName(word);
  }

  reloadProductsOnList() {
    this.productListProvider.getProductListByListId(this.navParams.get("listId"))
    .then(productList => {
      this.productsOnList.splice(0, this.productsOnList.length);
      productList.forEach(productOfProductList => {
        this.productsProvider.getProductById(productOfProductList.product_id)
        .then(productToProductList => {
          this.productsOnList.push(productToProductList);
        }).catch(error => {
          console.log(error);
        })
      });
    }).catch(error => {
      console.log(error);
    });
    this.numberOfProductsOnList = this.productsOnList.length;
  }
}
