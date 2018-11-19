import { LoginStatus } from './../../providers/login/LoginStatus';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Category } from '../../entities/category';
import { CategoryProvider } from '../../providers/category/category';
import { CreateCategoryPage } from '../create-category/create-category';
import { ProductsProvider } from '../../providers/product/product';
import { EditCategoryPage } from '../edit-category/edit-category';
import { ConfirmationPage } from './../confirmation/confirmation';
import { User } from '../../entities/user';

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
              public productsProvider: ProductsProvider,
              public modalController:ModalController,
              public userProvider: UserProvider) {
    userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      categoryProvider.getCategoryByNameAndUserId("OTROS", user.id)
      .then(other => {
        this.other = other;
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  }

  ionViewWillEnter() {
    this.reloadCategories();
  }

  reloadCategories() {
    this.userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      this.categoryProvider.getCategoriesByUserId(user.id)
      .then(categories => {
        this.categories = categories;
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  }

  confirm(category: Category){
    let callback=()=>{this.deleteCategory(category)};
    let message="¿Realmente quieres eliminar la categoria "+category.name+"?";
    const confirmationModal = this.modalController.create(ConfirmationPage,{callback:callback, message:message});
    confirmationModal.present();
  }

  deleteCategory(category: Category) {
    if(category.name != "OTRO") {
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

  editCategory(category_id: number) {
    this.navCtrl.push(EditCategoryPage, { categoryId: category_id })
  }

}
