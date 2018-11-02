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
              public platform: Platform) {    
    
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required]
    });

    categoryProvider.getCategoryById(navParams.data.data)
    .then(category => {
      this.category = category;
    }).catch(error => {
      console.log(error);
    });

    categoryProvider.getCategories()
    .then(categories => {
      this.categories = categories;
    }).catch(error => {
      console.log(error);
    });

    this.Image = "../../assets/imgs/default-product.jpg";
  }

  async saveProductForm() {
    this.product.image = this.Image;
    this.product.audio = this.filePath;
    this.productsProvider.saveProduct(this.product)
    .then(result => {
      console.log("Save product successfully");
    }).catch(error => {
      console.error(error);
    });
    this.afterSaveProduct();
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
  eventHandler(event){
    console.log(event);  
    let input = event.target;
    setTimeout(()=>{
      input.value=input.value.toUpperCase();
        }, 1);

  }
}
