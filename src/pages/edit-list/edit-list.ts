import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListProvider } from './../../providers/list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { List } from '../../entities/list';
import { ListsPage } from '../lists/lists';


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
    this.listProvider.getListById(navParams.get("listId"))
    .then(list => {
      this.list = list;
    }).catch(error => {
      console.error(error);
    })
  }

  async saveListForm() {
    this.list.name = this.list.name.toUpperCase();
    this.listProvider.updateList(this.list)
    .then(response => {
      if(response) this.afterSaveList();
    }).catch(error => {
      console.error(error);
    });
  }

  afterSaveList() {
    this.navCtrl.pop();
    this.navCtrl.push(ListsPage);
  }
}
