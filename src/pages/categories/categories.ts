import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../entities/category';
import { CategoryProvider } from '../../providers/category/category';
import { CreateCategoryPage } from '../create-category/create-category';
import { ProductsProvider } from '../../providers/product/product';
import { EditCategoryPage } from '../edit-category/edit-category';

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

  deleteCategory(category: Category) {
    if(category.id != 4) {
      this.productsProvider.updateCategory(category, this.other)
      .then(result => {
        if(result) {
          this.categoryProvider.deleteCategory(category.id)
          .then(result => {
            if(result) this.reloadCategories();
          }).catch(error => {
            console.error(error);
          })
        }
      }).catch(error => {
        console.error(error);
      })
    }
  }

  openCategoryModal() {
    this.navCtrl.push(CreateCategoryPage);
  }

  editCategory(categor_id: number) {
    this.navCtrl.push(EditCategoryPage, { categoryId: categor_id })
  }
}
