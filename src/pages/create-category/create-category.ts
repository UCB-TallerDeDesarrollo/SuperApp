import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-create-category',
  templateUrl: 'create-category.html',
})
export class CreateCategoryPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewController: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCategoryPage');
  }

  closeCategoryModal() {
    this.viewController.dismiss();
  }

}
