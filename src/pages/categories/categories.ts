import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../entities/category';
import { CategoryProvider } from '../../providers/category/category';
import { CreateCategoryPage } from '../create-category/create-category';
import { ProductsProvider } from '../../providers/product/product';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories: Array<Category>
  other: Category;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public categoryProvider: CategoryProvider,
              public productsProvider: ProductsProvider) {
    categoryProvider.getCategoryById(4)
    .then(other => {
      this.other = other;
    })
    .catch(error => {
      console.error(error);
    });
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
  
  async deleteCategory(category: Category) {
    if(category.id != 4) {
      await this.productsProvider.updateCategory(category, this.other);
      await this.categoryProvider.deleteCategory(category.id);
      this.reloadCategories();
    }
  }

  openCategoryModal() {
    this.navCtrl.push(CreateCategoryPage);
  }
}
