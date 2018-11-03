import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginStatus } from '../../providers/login/LoginStatus';

/**
 * Generated class for the ViewUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-user',
  templateUrl: 'view-user.html',
})
export class ViewUserPage {
  username: string;
  birthdate: Date;
  image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
    private toastCtrl: ToastController) {
      
}
async ionViewDidLoad() {
var user=await this.userProvider.getUserByUsername(LoginStatus.username);
  this.username=user.username;
  this.birthdate=user.birthdate;
  this.image=user.profilePictureURL;
}

}
