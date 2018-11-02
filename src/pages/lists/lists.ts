import { ListaPage } from './../lista/lista';
import { LoginStatus } from './../../providers/login/LoginStatus';
import { UserProvider } from './../../providers/user/user';
import { CreateListPage } from './../create-list/create-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { List } from '../../entities/list';
import { User } from '../../entities/user';
import { ListProvider } from '../../providers/list/list';
import { Login } from '../../providers/login/Login';
import { EditListPage } from '../edit-list/edit-list';
import {ConfirmationPage} from './../confirmation/confirmation';

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  user: User;
  lists: Array<List>;
  rowSelected;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public listProvider: ListProvider,
              public userProvider: UserProvider,
              private login: Login,
              private modalController: ModalController) {
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
    this.navCtrl.push(EditListPage, { listId: list_id })
  }

  listPage(list_id: number) {
    this.navCtrl.push(ListaPage, { listId: list_id });
  }

  createList() {
    this.navCtrl.push(CreateListPage);
  }

  async prepareAnonimusUser() {
    await this.userProvider.prepareAnonimusUser();
    await this.login.loadingGameData();
  }

  confirm(list: List){
    let callback=()=>{this.deleteList(list)};
    let message="¿Realmente quieres eliminar la lista "+list.name+"?";
    const confirmationModal = this.modalController.create(ConfirmationPage,{callback:callback, message:message});
    confirmationModal.present();
    this.hideRowSelected();
  }

  deleteList(list: List){
    //TODO: borrar lista ez v:
    console.log("Amague xdxdx");
  }

  active(id){
    let selector="#delete-"+id;
    let element= <HTMLElement>document.querySelector(selector);
    element.classList.remove("hidden");
    element.classList.add("options-section");
    this.rowSelected=element;
  }

  hideRowSelected(){
    if(this.rowSelected!=null){
      this.rowSelected.classList.remove("options-section");
      this.rowSelected.classList.add("hidden");
    }
  }
}
