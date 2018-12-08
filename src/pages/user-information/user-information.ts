import { LoginStatus } from './../../providers/login/LoginStatus';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProgress } from '../../entities/userProgress';
@Component({
  selector: 'page-user-information',
  templateUrl: 'user-information.html',
})
export class UserInformationPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }
  get username(){
    return LoginStatus.username;
  }
  get coins(){
    let userProgress=LoginStatus.userProgress;
    if (userProgress==undefined)
    {
      userProgress=new UserProgress(0,0,0,0,0,0,0,0,0);
    }
    return userProgress.coins;
  }
  get Image()
  {
    return LoginStatus.getImage();
  }
}