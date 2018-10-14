import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User as UserModel } from '../../shared/models/User.model';

/**
 * Generated class for the CreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {
  public username: string;
  public birthdate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }

  async saveUser() {
    let existsUsername = await this.userProvider.existsUsername(this.username);

    if (existsUsername) {
      let toast = this.toastCtrl.create({
        message: 'Ya existe un usuario con el nombre '+this.username,
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    } else {
      let profilePictureURL = '/picture/' + this.username;
      let newUser = UserModel.createUser(0, this.username,new Date(), profilePictureURL);

      await this.userProvider.saveUser(newUser);

      let toast = this.toastCtrl.create({
        message: 'Usuario registrado con éxito',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.afterSaveUser();
    }
  }

  afterSaveUser() {
    this.navCtrl.pop();
  }

}
