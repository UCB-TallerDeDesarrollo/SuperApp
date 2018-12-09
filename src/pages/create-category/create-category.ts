import { LoginStatus } from './../../providers/login/LoginStatus';
import { Login } from './../../providers/login/Login';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../entities/category';
import { CategoryProvider } from '../../providers/category/category';


@IonicPage()
@Component({
  selector: 'page-create-category',
  templateUrl: 'create-category.html',
})
export class CreateCategoryPage {

  category = new Category;
  categoryForm: FormGroup;
  isItAValidCategory: Boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewController: ViewController,
              public formBuilder: FormBuilder,
              public categoryProvider: CategoryProvider,
              public userProvider: UserProvider,
              public login: Login) {
    this.isItAValidCategory = false;
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  async saveCategoryForm() {
    this.userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      this.category.user_id = user.id;
      this.category.name = this.category.name.toUpperCase();
      this.categoryProvider.saveCategory(this.category)
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

  isItANameValid() {
    this.userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      this.category.name = this.category.name.toUpperCase();
      this.categoryProvider.isItANameValid(this.category.name, user.id)
      .then(result => {
        this.isItAValidCategory = result;
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  }
}
