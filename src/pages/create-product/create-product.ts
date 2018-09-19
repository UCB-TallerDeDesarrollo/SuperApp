import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../entities/product';
import { ProductProvider } from '../../providers/product/product';
import { getRepository, Repository } from 'typeorm';
/**
 * Generated class for the CreateProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {
  productForm: FormGroup;
  products: Product[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public productProvider: ProductProvider) {
    /*this.productForm = this.formBuilder.group({
      title: [''],
      image: [''],
      state: ['']
    });*/


  }

  async demo() {
    
    const prodRepository = getRepository('product') as Repository<Product>;

    let product = new Product();

    product.image = "Imagen Arroz";
    product.state = true;
    product.title = "Arroz";
    
    console.log("PRODUCT-> " + JSON.stringify(product));
    
    /*await prodRepository.save(product);

    const products = await prodRepository.createQueryBuilder('product')
                                        .orderBy('product.id', 'DESC')
                                        .getMany();

    console.log("PRODUCTS-> " + JSON.stringify(products));
    */
   
      await this.productProvider.saveProduct(product);

      let p = await this.productProvider.getProducts();
      console.log("OBJECTS GET-> " + JSON.stringify(p));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
    this.demo();
  }

}
