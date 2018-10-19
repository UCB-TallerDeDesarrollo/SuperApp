import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginStatus } from '../../providers/login/LoginStatus';
import { UserController } from '../../providers/user/UserController';

/**
 * Generated class for the DeleteUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-delete-user',
  templateUrl: 'delete-user.html',
})
export class DeleteUserPage {
  private userCtrl:UserController;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProv:UserProvider) {
    this.userCtrl=navParams.get("userCtrl");
  }

  ionViewDidLoad() {

  }

  async delete()
  {
    await this.userProv.deleteUserByUserName(LoginStatus.username);
    //this.userCtrl.logout();
    location.reload();
  }

}
