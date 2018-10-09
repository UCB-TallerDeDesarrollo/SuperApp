import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../entities/category';
import { CategoryProvider } from '../../providers/category/category';
import { ProductProvider } from '../../shared/providers/ProductProvider';
import { CreateCategoryPage } from '../create-category/create-category';

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
              public productProvider: ProductProvider) {
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
    this.navCtrl.push(CreateCategoryPage);
  }
}
