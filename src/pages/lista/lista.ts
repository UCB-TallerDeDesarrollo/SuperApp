import { ListProvider } from './../../providers/list/list';
import { ProductListProvider } from './../../providers/product-list/product-list';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { DragulaService } from 'ng2-dragula';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Category } from '../../entities/category';
import { Product } from '../../entities/product';
import { Categories } from '../../providers/FakeService/Categories';
import { CategoryProvider } from '../../providers/category/category';
import { ProductsProvider } from '../../providers/product/product';
import { ProductList } from '../../entities/productList';
import { List } from '../../entities/list';
import { LoginStatus } from '../../providers/login/LoginStatus';
import { UserProvider } from './../../providers/user/user';
import { Login } from '../../providers/login/Login';
import { ListsPage } from './../lists/lists';
import { ConfirmationPage } from './../confirmation/confirmation';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
  viewProviders: [DragulaService]
})
export class ListaPage implements OnInit, AfterViewInit {

  list = new List();
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
  productsOnList: Array<ProductList> = [];
  onViewProducts: Array<Product> = [];
  onViewCategories: Array<{id: number, name: string}>=[];
  ON_VIEW_LIST_LENGTH = 12;
  ON_VIEW_CATEGORIES_LENGTH = 3;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dragulaService: DragulaService,
              public productsProvider: ProductsProvider,
              public categoryProvider: CategoryProvider,
              private audioProvider: AudioProvider,
              private alertCtrl: AlertController,
              public productListProvider: ProductListProvider,
              public listProvider: ListProvider,
              public userProvider: UserProvider,
              private login: Login,
              private modalController: ModalController) {
    this.prepareAnonimusUser();
    this.list.name="NUEVA LISTA";
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
    this.chargeList();
    this.changeSoundIcon();
  }

  chargeList(){
    let listId=this.navParams.get("listId");
    if(listId>-1){
      this.listProvider.getListById(listId)
      .then(list => {
        this.list = list;
        this.loadProductsOnList();
      }).catch(error => {
        console.error(error);
      });
    }
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
    this.chargeList();
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
      let product=this.products.find(el=>el.id===product_id);
      let productListTemp = new ProductList();
      productListTemp.list_id = this.navParams.get("listId");
      productListTemp.product_id = product.id;
      productListTemp.product=product;
      this.productsOnList.push(productListTemp);
      this.products=this.products.filter(prod => prod.id!==product.id);
      this.chargeProducts();
      this.audioProvider.playPronunciationOfTheProductName(product.title);
      el.remove();
    });
  }

  public stopSound(){
    this.audioProvider.changeState();
    this.changeSoundIcon();
  }

  private changeSoundIcon(){
    if(this.audioProvider.isMuted()){
      this.imageSound="assets/imgs/soundOffDark.png";
    }
    else{
      this.imageSound="assets/imgs/soundOnDark.png";
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
      this.products=products.filter(product => {
        let isNotOnList =true;
        for(let productList of this.productsOnList){
          if(product.id===productList.product.id){
            isNotOnList=false;
            break;
          }
        }
        return isNotOnList;
      });
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

  onClickDeleteAProduct(productOfList) {
    let productId=productOfList.product.id;
    this.productsOnList=this.productsOnList.filter(onList=>onList.product_id!==productId);
    this.onSelectCategory(this.selectedCategory);    
  }

  deleteListOfProducts() {
    this.productsOnList=[];
    this.onSelectCategory(this.selectedCategory);
  }

  public playPronunciationOfTheProductName(word:string) {
    this.audioProvider.playPronunciationOfTheProductName(word);
  }

  loadProductsOnList() {
    let listId=this.navParams.get("listId");
    this.productListProvider.getProductListByListId(listId)
    .then(productList => {
      this.productsOnList.splice(0, this.productsOnList.length);
      productList.forEach(productOfProductList => {
        this.productsProvider.getProductById(productOfProductList.product_id)
        .then(product => {
          let productList=new ProductList();
          productList.list_id=listId;
          productList.product_id=product.id;
          productList.product=product;
          this.productsOnList.push(productList);
          this.products=this.products.filter(product => product.id!=product.id);
          this.chargeProducts();
        }).catch(error => {
          console.log(error);
        })
      });
    }).catch(error => {
      console.log(error);
    });
  }

  async saveList() {
    if(this.list.id){
      this.listProvider.updateList(this.list).then(success => {
        this.saveProductList();
      });
    }else{
      this.userProvider.getUserByUsername(LoginStatus.username)
      .then(user => {
        this.list.user_id = user.id;
        this.listProvider.saveList(this.list).then(success => {
          this.saveProductList();
        });
      }).catch(error => {
        console.error(error);
      });
    }
  }

  async saveProductList(){
    for(let onList of this.productsOnList){
      onList.list_id=this.list.id;
      this.productListProvider.saveProductList(onList);
    }
  }

  confirm(){
    let callback=()=>{this.deleteList()};
    let message="¿Realmente quieres eliminar la lista "+this.list.name+"?";
    const confirmationModal = this.modalController.create(ConfirmationPage,{callback:callback, message:message});
    confirmationModal.present();
  }

  deleteList(){
    this.productListProvider.deleteProductListByListId(this.list.id)
    .then(response => {
      if(!response) console.error("Inconsistent list information");
    })
    this.listProvider.deleteList(this.list.id)
    .then(response => {
      if(!response) console.error("Inconsistent list information");
    });
    this.list=new List;
    this.list.name="NUEVA LISTA";
    this.productsOnList=[];
  }

  openList(){
    this.navCtrl.pop();
    this.navCtrl.push(ListsPage);
  }

  editName(){
    let title=<HTMLBodyElement>document.querySelector("#list-name");
    let form=<HTMLBodyElement>document.querySelector("#name-form");
    title.classList.add("hide");
    form.classList.remove("hide");
  }

  saveListsName(){
    let title=<HTMLBodyElement>document.querySelector("#list-name");
    let form=<HTMLBodyElement>document.querySelector("#name-form");
    this.list.name=this.list.name.toUpperCase();
    title.classList.remove("hide");
    form.classList.add("hide");
  }

  async prepareAnonimusUser() {
    await this.userProvider.prepareAnonimusUser();
    await this.login.loadingGameData();
  }

}
