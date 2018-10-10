import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../entities/category';
import { CategoryProvider } from '../../providers/category/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
              private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    categoryProvider.getCategoryById(navParams.get('categoryId'))
    .then(category => {
      this.category = category;
    }).catch(error => {
      console.log(error);
    });
  }

  async saveCategoryForm() {
    this.category.name = this.category.name.toUpperCase();
    await this.categoryProvider.updateCategory(this.category);
    this.afterSaveCategory();
  }

  afterSaveCategory() {
    this.navCtrl.pop();
  }

}
