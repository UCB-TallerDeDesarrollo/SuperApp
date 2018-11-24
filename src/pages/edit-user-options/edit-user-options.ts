import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginStatus } from '../../providers/login/LoginStatus';
import { EditUserPage } from '../edit-user/edit-user';
import { LoginOptionsPage } from '../login-options/login-options';

/**
 * Generated class for the EditUserOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user-options',
  templateUrl: 'edit-user-options.html',
})
export class EditUserOptionsPage {

  private loginOptions: LoginOptionsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loginOptions=navParams.get("loginOptions");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserOptionsPage');
  }

  closeEditUserOptions() {
    this.navCtrl.pop();
  }

  edit() {
    this.navCtrl.push(EditUserPage, {loginOptions: this.loginOptions});
  }

  logout() {
    LoginStatus.setLogout();
    this.loginOptions.changeLoginIcons();
    this.navCtrl.pop();
  }

}
