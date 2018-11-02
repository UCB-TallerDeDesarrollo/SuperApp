import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Platform } from 'ionic-angular';
import { Product } from '../../entities/product';
import { CreateProductPage } from '../create-product/create-product';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { EditProductPage } from '../edit-product/edit-product';
import { CategoriesPage } from '../categories/categories';
import { Category } from '../../entities/category';
import { Categories } from '../../providers/FakeService/Categories';
import { FakeProducts } from '../../providers/FakeService/FakeProducts';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import {ConfirmationPage} from './../confirmation/confirmation';

@IonicPage()
@Component({
  selector: 'page-products-editor',
  templateUrl: 'products-editor.html',
})
export class ProductsEditorPage implements OnDestroy {

  products: Array<Product>;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  rowSelected;

  constructor(private platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              public productsProvider: ProductsProvider,
              public categoryProvider: CategoryProvider,
              private media: Media,
              private file: File,
              private screenOrientation: ScreenOrientation,
              private audioProvider    : AudioProvider,
              private modalController: ModalController) {
    this.databaseInitializer();
    this.reloadProducts();
    platform.ready()
    .then(() => {
      if (platform.is('cordova')){
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
    }).catch(err=> {
      console.log('Error while loading platform', err);
    });
  }

  ionViewWillEnter() {
    this.reloadProducts();
  }

  reloadProducts() {
    this.productsProvider.getProducts()
    .then(products => {
      this.products = products.filter(product=>product.on_list==1);
    }).catch(error =>{
      console.log(error);
    });
  }

  goToRoot(){
    if (this.platform.is('cordova')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    this.navCtrl.pop();
  }

  goToCategories() {
    this.navCtrl.push(CategoriesPage);
  }

  ngOnDestroy(){
    if (this.platform.is('cordova')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
  }

  pushCreateProduct(){
    this.navCtrl.push(CreateProductPage, { data: this.navParams.data.data });
  }

  editProduct(product_id: number){
    this.navCtrl.push(EditProductPage, {data: product_id, categoryId: this.navParams.data.data});
  }

  async changeState(product_id: number, product_state: number) {
    if(product_state==1){
      await this.productsProvider.updateStateProduct(0, product_id);
    }else{
      await this.productsProvider.updateStateProduct(1, product_id);
    }
    this.navCtrl.pop();
    this.navCtrl.push(ProductsEditorPage, { data: this.navParams.data.data });
  }

  async databaseInitializer() {
    const count_product = await this.productsProvider.countProducts();
    const count_category = await this.categoryProvider.countCategories();
    if(count_category == 0) {
      let categories = Categories.getCategories();
      for(const c in categories) {
        let category = new Category();
        category.name = categories[c].name;
        this.categoryProvider.saveCategory(category)
        .then(response => {
          if(response) {
            this.categoryProvider.getCategoryByName(category.name)
            .then(currentCategory => {
              let products = FakeProducts.getProducts()
              for (const p in products) {
                if(currentCategory.name === category.name) {
                  let product = new Product();
                  product.image = products[p].image;
                  product.state = 1;
                  product.audio = " ";
                  product.title = products[p].title;
                  product.category_id = currentCategory.id;
                  this.productsProvider.saveProduct(product)
                  .then(response => {
                    if(!response) console.error("Inconsistent product information");
                  }).catch(error => {
                    console.error(error);
                  });
                }
              }
            })
          }
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  public playSoundOfWord(product_title :string, product_audio :string) {
    if(product_audio == " "){
      this.audioProvider.playPronunciationOfTheProductName(product_title);
    }else{
      this.playAudio(product_audio);
    }
  }

  playAudio(file) {
    if (this.platform.is('ios')) {
      this.filePath = file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(1.0);
  }

  confirm(product: Product){
    let callback=()=>{this.deleteProduct(product)};
    let message="¿Realmente quieres eliminar el producto "+product.title+"?";
    const confirmationModal = this.modalController.create(ConfirmationPage,{callback:callback, message:message});
    confirmationModal.present();
    this.hideRowSelected();
  }

  deleteProduct(product: Product){
    let view=product.on_list;
    if(view==1){
      product.on_list=0;
    }
    this.productsProvider.updateProduct(product);
    this.reloadProducts();
  }

  active(id){
    let selector="#delete-"+id;
    let element= <HTMLElement>document.querySelector(selector);
    element.classList.remove("hidden");
    element.classList.add("options-section");
    this.rowSelected=element;
  }

  hideRowSelected(){
    if(this.rowSelected!=null){
      this.rowSelected.classList.remove("options-section");
      this.rowSelected.classList.add("hidden");
    }
  }
}
