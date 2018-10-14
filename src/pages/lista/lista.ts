import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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
  imageSound: String;
  productsOnList: Array<{ id: number, title: string, image: string, categoryId: number }> = [];
  numberOfProductsOnList: number;

  constructor(
    public navCtrl: NavController, 
    private dragulaService: DragulaService, 
    public productsProvider: ProductsProvider, 
    public categoryProvider: CategoryProvider,
    private audioProvider: AudioProvider,
    private alertCtrl: AlertController
  ) {
    this.selectedCategory=Categories.getCategoryById(this.defaultCategoryId); 
    categoryProvider.getCategories()
    .then(categories => {
      this.categories = categories;
    })
    .catch(error => {
      console.log(error);
      });
    productsProvider.getProductsByCategoryOnlyActive(this.defaultCategoryId)
    .then(products => {
      this.products=products;
    })
    .catch(error => {
      console.log(error);
    });    

    this.changeSoundIcon();
    this.productsOnList = FakeListProducts.getProducts().reverse();
    this.numberOfProductsOnList = this.productsOnList.length;
  }

  ionViewWillEnter() {    
    this.changeSoundIcon();
    this.productsProvider.getProductsByCategoryOnlyActive(this.selectedCategory.id)
      .then(products => {
        this.products = products;
      }).catch(error => {
        console.log(error);
      });
    this.reloadProductsOnList();
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
        .then(p => {
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
            }).catch(error => {
              console.log(error);
            });         
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
  
  onSelectCategory(category){ 
    this.selectedCategory = category;
    this.productsProvider.getProductsByCategoryOnlyActive(this.selectedCategory.id)
    .then(products => {
      this.products = products;
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
            console.log(FakeProducts.getProducts());            
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
    this.numberOfProductsOnList = this.productsOnList.length;
  }

  onClickDeleteAProduct(product, indexOfProduct) {
    FakeListProducts.removeProduct(indexOfProduct);
    this.products.push(product);
    this.products.sort(function (obj1, obj2) {
      return obj1.id - obj2.id;
    });
    this.numberOfProductsOnList = this.productsOnList.length;
  }

  deleteListOfProducts() {
    FakeListProducts.deleteAllProducts();
    this.productsProvider.getProductsByCategoryOnlyActive(this.selectedCategory.id).then(products => {
      this.products = products;
    }).catch(error => {
      console.log(error);
    });
    this.reloadProductsOnList();
    this.numberOfProductsOnList = this.productsOnList.length;
  }

  reloadProductsOnList() {
    this.productsOnList = FakeListProducts.getProducts();
  }
}  
