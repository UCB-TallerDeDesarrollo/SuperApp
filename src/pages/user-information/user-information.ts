import { LoginStatus } from './../../providers/login/LoginStatus';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavPopAnchor } from 'ionic-angular';
import { UserProgress } from '../../entities/userProgress';
@Component({
  selector: 'page-user-information',
  templateUrl: 'user-information.html',
})
export class UserInformationPage {
  public darkTheme:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.setupTheme();
  }
  setupTheme(): void {
    let dark=this.navParams.get("dark");
    if (dark)
    {
      this.darkTheme=true;
    }
    else{
      this.darkTheme=false;
    }
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