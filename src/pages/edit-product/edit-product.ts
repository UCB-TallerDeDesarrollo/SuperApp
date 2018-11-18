import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Camera } from '@ionic-native/camera';
import { Product } from '../../entities/product';
import { Category } from '../../entities/category';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
  providers: [[Camera]]
})
export class EditProductPage {
  recording: boolean = false;
  options: any;
  Image: any;
  path: any;
  product = new Product;
  categories: Array<Category>;
  productForm: FormGroup;
  filePath: string = " ";
  fileName: string;
  audio: MediaObject;

  constructor(public navCtrl: NavController,
              private media: Media,
              private file: File,
              public navParams: NavParams,
              public productsProvider: ProductsProvider,
              public categoryProvider: CategoryProvider,
              public camera: Camera,
              private formBuilder: FormBuilder,
              public platform: Platform,
              public alertCtrl: AlertController) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.productsProvider.getProductById(navParams.data.data)
    .then(product => {
      this.product = product;
      this.Image = product.image;
      this.filePath = product.audio;
    }).catch(error => {
      console.error(error);
    });

    this.categoryProvider.getCategories()
    .then(categories => {
      this.categories = categories;
    }).catch(error => {
      console.error(error);
    });
  }

  async saveProductForm() {
    this.product.image = this.Image;
    this.product.audio = this.filePath;
    this.product.title = this.product.title.toUpperCase();
    this.productsProvider.updateProduct(this.product)
    .then(response => {
      if(response) this.afterSaveProduct();
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
      quality: 100,
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

  public disableRecordedSound(){
    this.filePath = " ";
    this.audio.release();
  }
}
