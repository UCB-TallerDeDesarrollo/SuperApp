import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Login } from '../../providers/login/login';

@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage{
  public username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider, private toastCtrl: ToastController, public loginCtrl:Login) {
  }

  public async login()
  {
    if (this.loginCtrl.login(this.username))
    {
      let toast=this.toastCtrl.create({
        message:"Bienvenido "+this.username,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.pop();
    }
    else{
      let toast=this.toastCtrl.create({
        message:"El usuario "+this.username+" no existe",
        duration: 3000,
        position: 'bottom'
      })
      toast.present();
    }
   
  }

}
