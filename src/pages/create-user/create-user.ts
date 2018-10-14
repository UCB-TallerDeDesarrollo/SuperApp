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
    this.databaseInitializer();
  }

  async databaseInitializer() {
    const count_users = await this.userProvider.countUsers();

    if (count_users == 0) {
      let defaultUser = UserModel.createUser(0, 'default', new Date(), '/picture/default');

      await this.userProvider.saveUser(defaultUser);
    }
  }

  async saveUser() {
    let existsUsername = await this.userProvider.existsUsername(this.username);

    if (existsUsername) {
      let toast = this.toastCtrl.create({
        message: 'ERROR, username invalido',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    } else {
      let profilePictureURL = '/picture/' + this.username;
      let newUser = UserModel.createUser(0, this.username, this.birthdate, profilePictureURL);

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
