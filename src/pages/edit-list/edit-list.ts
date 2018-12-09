import { LoginStatus } from './../../providers/login/LoginStatus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListProvider } from './../../providers/list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { List } from '../../entities/list';
import { ListsPage } from '../lists/lists';
import { UserProvider } from './../../providers/user/user';
import { Login } from './../../providers/login/Login';

@IonicPage()
@Component({
  selector: 'page-edit-list',
  templateUrl: 'edit-list.html',
})
export class EditListPage {

  list = new List;
  listForm: FormGroup;
  isItAValidList: Boolean;
  currentName: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public listProvider: ListProvider,
              public formBuilder: FormBuilder,
              public userProvider: UserProvider,
              public login: Login,
              public toastController: ToastController) {
    this.isItAValidList = true;
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.listProvider.getListById(navParams.get("listId"))
    .then(list => {
      this.list = list;
      this.currentName = list.name;
    }).catch(error => {
      console.error(error);
    })
  }

  async saveListForm() {
    this.userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      this.list.user_id = user.id;
      this.list.name = this.list.name.toUpperCase();
      this.listProvider.updateList(this.list)
      .then(response => {
        if(response) this.afterSaveList();
      }).catch(error => {
        console.error(error);
      });
    })
  }

  afterSaveList() {
    this.navCtrl.pop();
    this.navCtrl.push(ListsPage);
  }

  isItANameValid() {
    this.userProvider.getUserByUsername(LoginStatus.username)
    .then(user => {
      this.list.name = this.list.name.toUpperCase();
      this.listProvider.isItANameValid(this.list.name, user.id)
      .then(result => {
        this.isItAValidList = result || (this.currentName === this.list.name);
          if(!this.isItAValidList) {
            this.nameAlreadyExist();
          }
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  }

  nameAlreadyExist() {
    let alertMessage = this.toastController.create({
      message: 'YA EXISTE UNA LISTA CON EL NOMBRE: ' + this.list.name,
      duration: 2000,
      position: 'bottom'
    });
    alertMessage.present();
  }
}
