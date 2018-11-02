import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { List } from './../../entities/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListProvider } from '../../providers/list/list';


@IonicPage()
@Component({
  selector: 'page-create-list',
  templateUrl: 'create-list.html',
})
export class CreateListPage {

  list = new List;
  listForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public listProvider: ListProvider) {
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  async saveListForm() {
    this.listProvider.saveList(this.list)
    .then(response => {
      if(response) console.error("Inconsistent list information");
    }).catch(error => {
      console.error(error);
    })
  }
}
