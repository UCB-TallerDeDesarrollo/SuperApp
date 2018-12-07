import { Login } from './../../providers/login/Login';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../entities/category';
import { CategoryProvider } from '../../providers/category/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginStatus } from '../../providers/login/LoginStatus';

@IonicPage()
@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {

  category = new Category;
  categoryForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public categoryProvider: CategoryProvider,
              private formBuilder: FormBuilder,
              public userProvider: UserProvider,
              public login: Login) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.categoryProvider.getCategoryById(navParams.get('categoryId'))
    .then(category => {
      this.category = category;
    }).catch(error => {
      console.error(error);
    });
  }

  async saveCategoryForm() {
    this.userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      this.category.user_id = user.id;
      this.category.name = this.category.name.toUpperCase();
      this.categoryProvider.updateCategory(this.category)
      .then(response => {
        if(response) this.afterSaveCategory();
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  }

  afterSaveCategory() {
    this.navCtrl.pop();
  }
}
