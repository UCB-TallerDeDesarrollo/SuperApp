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
 
  ionViewWillEnter() {
    this.reloadCategories();  
  }

  reloadCategories() {
    this.categoryProvider.getCategories()
    .then(categories => {
      this.categories = categories;
    }).catch(error => {
      console.error(error);
    });
  }
  
  async deleteCategory(category_id: number) {
    console.log("deleteCategory");
    await this.categoryProvider.deleteCategory(category_id);
    this.reloadCategories();
  }

  openCategoryModal() {
    this.navCtrl.push(CreateCategoryPage);
  }
}
