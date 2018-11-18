import { LoginStatus } from './../../providers/login/LoginStatus';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ProductsProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Camera } from '@ionic-native/camera';
import { Product } from '../../entities/product';
import { Category } from '../../entities/category';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { type } from 'os';
import { Login } from '../../providers/login/Login';

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
  providers: [[Camera]]
})
export class CreateProductPage {
  recording: boolean = false;
  options: any;
  Image: any;
  path: any;
  product = new Product;
  category: Category;
  categories: Array<Category>;
  productForm: FormGroup;
  filePath: string = " ";
  fileName: string;
  audio: MediaObject;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private media: Media,
              private file: File,
              public productsProvider: ProductsProvider,
              public categoryProvider: CategoryProvider,
              public camera: Camera,
              private formBuilder: FormBuilder,
              public platform: Platform,
              public userProvider: UserProvider,
              public login: Login) {
    async() => await this.prepareAnonimusUser();
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required]
    });

    categoryProvider.getCategoryById(navParams.data.data)
    .then(category => {
      this.category = category;
    }).catch(error => {
      console.error(error);
    });

    userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      categoryProvider.getCategoriesByUserId(user.id)
      .then(categories => {
        this.categories = categories;
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });

    this.Image = "../../assets/imgs/default-product.jpg";
  }

  async saveProductForm() {
    this.product.image = this.Image;
    this.product.audio = this.filePath;
    this.product.title = this.product.title.toUpperCase();
    this.productsProvider.saveProduct(this.product)
    .then(result => {
      if(result) this.afterSaveProduct();
    }).catch(error => {
      console.error(error);
    });
  }

  callFunctionCamera(option: number){
    let type;
    let action;
    switch (option) {
      case 1:
        type = this.camera.PictureSourceType.CAMERA;
        action = true;
        break;
      case 2:
        type = this.camera.PictureSourceType.PHOTOLIBRARY;
        action = false;
        break;
    }
    this.takePicture(type, action);
  }

  afterSaveProduct(){
    this.navCtrl.pop();
  }

  takePicture(type: any, action: boolean){
    this.options = {
      quality: 50,
      targetWidth: 800,
      targetHeight: 800,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: action,
      sourceType: type
    }
    this.camera.getPicture(this.options)
      .then((imageData)=>{
        this.Image = "data:image/jpeg;base64,"+imageData;
      }).then((path) => {
        this.path = path;
      }).catch((error) => {
        console.error(error);
      })
  }
  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }
  stopRecord() {
    this.audio.stopRecord();
    this.recording = false;
  }

  async prepareAnonimusUser() {
    await this.userProvider.prepareAnonimusUser();
    await this.login.loadingGameData();
  }
}
