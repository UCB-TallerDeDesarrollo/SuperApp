import { UserProvider } from './../../providers/user/user';
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
import { Login } from '../../providers/login/Login';

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
  playing: boolean = true;
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
              private modalController: ModalController,
              public userProvider: UserProvider,
              public login: Login) {
    (async() => {
      await this.prepareAnonimusUser();
      this.reloadProducts();
    })();
    platform.ready()
    .then(() => {
      if (platform.is('cordova')){
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
    }).catch(err=> {
      console.error('Error while loading platform', err);
    });
  }

  ionViewWillEnter() {
    this.reloadProducts();
  }

  reloadProducts() {
    this.userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      this.productsProvider.getProductsByUserId(user.id)
      .then(products => {
        this.products = products.filter(product=>product.on_list==1);
      }).catch(error =>{
        console.error(error);
      });
    }).catch(error =>{
      console.error(error);
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
  public playSoundOfWord(product_title :string, product_audio :string) {
    if(product_audio == " "){
      this.audioProvider.playPronunciationOfTheProductName(product_title);
    }else{
      this.playAudio(product_audio);
    }
  }

  playAudio(file) {
    this.playing = false;
    if (this.platform.is('ios')) {
      this.filePath = file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(1.0); 

    setTimeout(() => 
    {
      this.playing=true;
    },
    2000);
  }
  stopAudio(){
    this.audio.stop();
    this.playing=true;
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

  async prepareAnonimusUser()
  {
      await this.userProvider.prepareAnonimusUser();
      await this.login.loadingGameData();
  }
}
