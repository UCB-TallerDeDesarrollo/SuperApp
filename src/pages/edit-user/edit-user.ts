import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginStatus } from '../../providers/login/LoginStatus';
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { AvatarProvider } from '../../shared/providers/AvatarProvider';
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
  options: { quality: number; sourceType: number; saveToPhotoAlbum: boolean; correctOrientation: boolean; destinationType: number; mediaType: number; };
  Image: string;
  path: void;
  isenabled:boolean=false;
  public avatars: { id: number, name: string } [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
              private toastCtrl: ToastController, public camera:Camera, public avatarProvider: AvatarProvider,
              public alertCtrl:AlertController) {
          this.avatars = this.avatarProvider.getAvatars();
  }
  async ionViewDidLoad() {
    var user=await this.userProvider.getUserByUsername(LoginStatus.username);
    this.username=user.username;
    this.birthdate=user.birthdate;
    this.Image=user.profilePictureURL;
    if(this.Image !== "assets/imgs/user.png"){
      //enable the button
        this.isenabled=true; 
      }else{
      //disable the button
        this.isenabled=false;
      }
  }

  async saveUser()
  {
    var user=await this.userProvider.getUserByUsername(LoginStatus.username);
    user.username=this.username;
    user.birthdate=this.birthdate;
    user.profilePictureURL = this.Image;
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

  takePhoto()
  {
    this.options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO
    }
    this.camera.getPicture(this.options)
      .then((imageData)=>{
        this.Image = "data:image/jpeg;base64,"+imageData;
        this.isenabled=true;
      }).then((path) => {
        this.path = path;
      }).catch((error) => {
        console.log(error);
      })
      var a=1;
  }

  deleteImage()
  {
    const confirm = this.alertCtrl.create({
      title: '¿Estás seguro de eliminar tu foto de usuario?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.Image ="assets/imgs/user.png";
            this.isenabled=false;
          }
        }
      ]
    });
    confirm.present();
  }
}
