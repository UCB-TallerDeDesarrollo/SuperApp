import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Select } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../entities/user';
import { Camera } from '@ionic-native/camera';
import { AvatarProvider } from '../../shared/providers/AvatarProvider';

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
  @ViewChild('select') select1: Select;
  public username: string;
  public birthdate: Date;
  options: { quality: number; sourceType: number; saveToPhotoAlbum: boolean; correctOrientation: boolean; destinationType: number; mediaType: number; };
  Image: string;
  Picture:string;
  path: void;
  public avatars: { id: number, name: string } [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
              private toastCtrl: ToastController, public camera:Camera, public avatarProvider: AvatarProvider) {
              //this.Image="assets/imgs/user.png";
              this.avatars = this.avatarProvider.getAvatars();
              this.Image = "assets/imgs/avatars/avatar0.png";
              this.Picture="";
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
      let newUser:User = new User(this.username, new Date(),this.Image);
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

 async takePhoto()
  {
    this.options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO
    }
    await this.camera.getPicture(this.options)
      .then((imageData)=>{
        this.Picture = "data:image/jpeg;base64,"+imageData;
      }).then((path) => {
        this.path = path;
      }).catch((error) => {
        console.log(error);
      })
      this.Image=this.Picture;
  }
  showSelect(){
    this.select1.open();
  }

}
