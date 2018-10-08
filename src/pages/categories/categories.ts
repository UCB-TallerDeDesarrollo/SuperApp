import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Category } from '../../entities/category';
import { CategoryProvider } from '../../providers/category/category';
import { ProductProvider } from '../../shared/providers/ProductProvider';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories: Array<Category>

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public categoryProvider: CategoryProvider,
              public productProvider: ProductProvider,
              public modalController: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }
 
  ionViewWillEnter() {
    this.reloadCategories();  
  }

  reloadCategories() {
    this.categoryProvider.getCategories()
    .then(categories => {
      this.categories = categories;
      console.log(JSON.stringify(categories));
    }).catch(error => {
      console.error(error);
    });
  }
  
  openCategoryModal() {
    console.log("OpenCategoryModal");
  }
}
