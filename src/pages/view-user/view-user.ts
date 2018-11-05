import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginStatus } from '../../providers/login/LoginStatus';
import { UseContainerOptions } from 'typeorm';
import { User } from '../../entities/user';

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
  Image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
    private toastCtrl: ToastController) {
      
}
async ionViewDidLoad() {
var user=LoginStatus.user;
  this.username=user.username;
  this.birthdate=user.birthdate;
  this.Image=user.profilePictureURL;
}

}
