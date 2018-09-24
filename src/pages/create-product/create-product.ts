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
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
  providers: [[Camera]]
})
export class CreateProductPage {
  
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
    await this.productsProvider.saveProduct(this.product);
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
}