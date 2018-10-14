import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User as UserModel } from '../../shared/models/User.model'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
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

}
