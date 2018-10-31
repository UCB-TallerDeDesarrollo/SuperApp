import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginStatus } from '../../providers/login/LoginStatus';

/**
 * Generated class for the EditUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  public username: string;
  public birthdate: Date=new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
              private toastCtrl: ToastController) {
                
  }
  async ionViewDidLoad() {
    var user=await this.userProvider.getUserByUsername(LoginStatus.username);
    this.username=user.username;
    this.birthdate=user.birthdate;
  }

  async saveUser()
  {
    var user=await this.userProvider.getUserByUsername(LoginStatus.username);
    user.username=this.username;
    user.birthdate=this.birthdate;
    try{
      await this.userProvider.updateUser(user);
      var toast=this.toastCtrl.create({
        message:"Datos de usuario actualizados",
        duration:3000,
        position: 'bottom'
      });
      toast.present();
      LoginStatus.setLoginSuccess(this.username);
      this.navCtrl.pop();
    }
    catch
    {
      this.userProvider.updateUser(user);
      var toast=this.toastCtrl.create({
        message:"Error, no se guardaron los cambios",
        duration:3000,
        position: 'bottom'
      });
      toast.present();
    }
  }
}
