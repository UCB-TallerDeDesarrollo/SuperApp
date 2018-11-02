import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListProvider } from './../../providers/list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { List } from '../../entities/list';


@IonicPage()
@Component({
  selector: 'page-edit-list',
  templateUrl: 'edit-list.html',
})
export class EditListPage {

  list = new List;
  listForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public listProvider: ListProvider,
              public formBuilder: FormBuilder) {
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditListPage');
  }

}
