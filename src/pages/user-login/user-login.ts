import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, List } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Login } from '../../providers/login/Login';
import { LoginOptionsPage } from '../login-options/login-options';
import { User } from '../../entities/user';

@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage{
  private loginOptions:LoginOptionsPage;
  public users:User[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider, private toastCtrl: ToastController, public loginCtrl:Login) {
    this.loginOptions=navParams.get("loginOptions");
    
  }
  async ionViewDidLoad(){
    let usersList=await this.userProvider.getAllUsers();
    let list:Array<User>=new Array<User>();
    usersList.forEach(element => {
      if(element.username!=="anonimus")
      {
        list.push(element);
      }
    });
    list.sort();
    this.users=list; 
  }
  public async login(username:string)
  {
    if (await this.loginCtrl.login(username))
    {
     await this.loginCtrl.loadingGameData();
      let toast=this.toastCtrl.create({
        message:"Bienvenido "+username,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.pop();
      this.loginOptions.changeLoginIcons();
    }
    else{
      let toast=this.toastCtrl.create({
        message:"El usuario "+username+" no existe",
        duration: 3000,
        position: 'bottom'
      })
      toast.present();
    }
   
  }

}
