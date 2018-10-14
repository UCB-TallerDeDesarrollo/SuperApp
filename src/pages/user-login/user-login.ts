import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage {
  public username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider:UserProvider, private toastCtrl: ToastController) {
  }

  public async login()
  {
    var existUser:boolean=await this.userProvider.existsUsername(this.username);
    if (existUser)
    {
      var user=await this.userProvider.getUserByUsername(this.username);
        let toast=this.toastCtrl.create({
          message:"Bienvenido "+this.username,
          duration: 3000,
          position: 'bottom'
        });
        this.navCtrl.pop();
        toast.present();
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
