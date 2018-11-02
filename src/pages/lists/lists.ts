import { ListaPage } from './../lista/lista';
import { LoginStatus } from './../../providers/login/LoginStatus';
import { UserProvider } from './../../providers/user/user';
import { CreateListPage } from './../create-list/create-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { List } from '../../entities/list';
import { User } from '../../entities/user';
import { ListProvider } from '../../providers/list/list';
import { Login } from '../../providers/login/Login';

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  user: User;
  lists: Array<List>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public listProvider: ListProvider,
              public userProvider: UserProvider,
              private login: Login) {
  }

  ionViewWillEnter() {
    this.initializerVariables();
  }

  async initializerVariables() {
    await this.prepareAnonimusUser();
    this.userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      this.user = user;
      this.listProvider.getListsByUserId(this.user.id)
      .then(lists => {
        this.lists = lists;
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  }

  editList(list_id: number) {
    console.log(list_id);
    //this.navCtrl.push(EditCategoryPage, { categoryId: categor_id })
  }

  listPage(list_id: number) {
    console.log(list_id);
    this.navCtrl.push(ListaPage);
  }

  createList() {
    this.navCtrl.push(CreateListPage);
  }

  async prepareAnonimusUser() {
    await this.userProvider.prepareAnonimusUser();
    await this.login.loadingGameData();
  }
}
