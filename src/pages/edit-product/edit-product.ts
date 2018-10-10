import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Camera } from '@ionic-native/camera';
import { Product } from '../../entities/product';
import { Category } from '../../entities/category';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
  providers: [[Camera]]
})
export class EditProductPage {

  options: any;
  Image: any;
  path: any;
  product = new Product;
  category: Category;
  categories: Array<Category>;
  productForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public productsProvider: ProductsProvider, 
              public categoryProvider: CategoryProvider,
              public camera: Camera,
              private formBuilder: FormBuilder) {
    
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required]
    });
     
    categoryProvider.getCategoryById(navParams.get('categoryId'))
    .then(category => {
      this.category = category;
    }).catch(error => {
      console.log(error);
    });
            
    this.productsProvider.getProductById(navParams.data.data)
    .then(product => {
      this.product = product;
      this.Image = product.image;
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
    await this.productsProvider.updateProduct(this.product);
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
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }
}
