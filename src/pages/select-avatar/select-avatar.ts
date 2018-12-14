import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AvatarProvider } from '../../shared/providers/AvatarProvider';

/**
 * Generated class for the SelectAvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-avatar',
  templateUrl: 'select-avatar.html',
})
export class SelectAvatarPage {
  public avatars: { id: number, name: string } [];
  constructor(public navCtrl: NavController, public viewCtrl:ViewController, public navParams: NavParams, public avatarProvider: AvatarProvider) {
    this.avatars = this.avatarProvider.getAvatars();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectAvatarPage');
  }
  selectAvatar(idAvatar:number){
    this.viewCtrl.dismiss({idAvatar:idAvatar});
  }
}
