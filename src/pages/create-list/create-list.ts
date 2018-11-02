import { UserProvider } from './../../providers/user/user';
import { ListaPage } from './../lista/lista';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { List } from './../../entities/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListProvider } from '../../providers/list/list';
import { User } from '../../entities/user';
import { LoginStatus } from '../../providers/login/LoginStatus';


@IonicPage()
@Component({
  selector: 'page-create-list',
  templateUrl: 'create-list.html',
})
export class CreateListPage {

  user: User;
  list = new List;
  listForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public listProvider: ListProvider,
              public userProvider: UserProvider) {
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      this.user = user;
      this.list.user_id = this.user.id;
    }).catch(error => {
      console.error(error);
    });
  }

  async saveListForm() {
    this.listProvider.saveList(this.list)
    .then(response => {
      if(response) this.afterSaveList();
    }).catch(error => {
      console.error(error);
    })
  }

  afterSaveList() {
    this.navCtrl.pop();
  }
}
