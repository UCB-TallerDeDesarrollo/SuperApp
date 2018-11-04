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
      console.log("constructor()");
      console.log(this.product);
      this.Image = product.image;
      this.filePath = product.audio;
    }).catch(error => {
      console.log(error);
    });

    this.categoryProvider.getCategories()
    .then(categories => {
      this.categories = categories;
    }).catch(error => {
      console.log(error);
    });
  }

  async saveProductForm() {
    this.product.image = this.Image;
    this.product.audio = this.filePath;
    this.productsProvider.updateProduct(this.product)
    .then(response => {
      if(response) this.afterSaveProduct();
    }).catch(error => {
      console.error(error);
    });
  }

  callFunctionCamera(){
    this.takePicture();
  }

  afterSaveProduct(){
    this.navCtrl.pop();
  }

  takePicture(){
    this.options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO
    }
    this.camera.getPicture(this.options)
      .then((imageData)=>{
        this.Image = "data:image/jpeg;base64,"+imageData;
      }).then((path) => {
        this.path = path;
      }).catch((error) => {
        console.log(error);
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
  eventHandler(event){
    let input = event.target;
    setTimeout(()=>{
      input.value=input.value.toUpperCase();
        }, 1);

  }
}
