import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Select, ModalController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginStatus } from '../../providers/login/LoginStatus';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { AvatarProvider } from '../../shared/providers/AvatarProvider';
import { Login } from '../../providers/login/Login';
import { DeleteImagePage } from '../delete-image/delete-image';
import { SelectAvatarPage } from '../select-avatar/select-avatar';
import { LoginOptionsPage } from '../login-options/login-options';
import { DeleteUserPage } from '../delete-user/delete-user';
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
  @ViewChild('select') select1: Select;
  private lastNavCtrl:NavController;
  public static deleteImageOption:boolean=false;
  public username: string;
  public birthdate: Date=new Date();
  options: { quality: number; sourceType: number; saveToPhotoAlbum: boolean; correctOrientation: boolean; destinationType: number; mediaType: number; };
  Image: string;
  path: void;
  public avatars: { id: number, name: string } [];
  Picture: string;
  private loginOptions: LoginOptionsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
              private toastCtrl: ToastController, public camera:Camera, public avatarProvider: AvatarProvider,
              public alertCtrl:AlertController, public login:Login, public modalCtrl:ModalController, public viewCtrl:ViewController) {
          this.avatars = this.avatarProvider.getAvatars();
          this.lastNavCtrl=navParams.get("navCtrl");
          this.loginOptions=navParams.get("loginOptions");
  }
  async ionViewDidLoad() {
    var user=await this.userProvider.getUserByUsername(LoginStatus.username);
    this.username=user.username;
    this.birthdate=user.birthdate;
    this.Image=user.profilePictureURL;
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
      this.login.login(this.username);
      LoginStatus.user=user;
      this.loginOptions.changeLoginIcons();
      this.navCtrl.pop();
      //this.navCtrl.setRoot(HomePage, {}, {animate:true, direction:'back'});
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

  async takePicture(source) {
    try {
      let cameraOptions: CameraOptions = {
        quality: 50,
        targetWidth: 800,
        targetHeight: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: (source == 'camera') ? true : false,
        allowEdit: true
      };
      
      cameraOptions.sourceType = (source == 'camera') ? this.camera.PictureSourceType.CAMERA :
                                                        this.camera.PictureSourceType.PHOTOLIBRARY;
      
      const result = await this.camera.getPicture(cameraOptions);
      const image = 'data:image/jpeg;base64,' + result;

      this.Image = image;
      
    } catch(e) {
      console.log(e);
    }
  }
  async showSelect(){
    let selectAvatar=this.modalCtrl.create(SelectAvatarPage);
    selectAvatar.onDidDismiss(
      (data)=>{
          if (data!=null)
          {
            this.changeImage(data);
          }
      }
    );
    await selectAvatar.present();
  }
  changeImage(data)
  {
    let reference:string="assets/imgs/avatars/avatar"+data.idAvatar+".png";
    this.Image=reference;
  }

  deleteCurrentUser() {
    let modal=this.modalCtrl.create(DeleteUserPage, {userCtrl: this});
    modal.present();
  }

  logout() {
    LoginStatus.setLogout();
    var toast=this.toastCtrl.create({
      message:"Sesion finalizada",
      duration:3000,
      position: 'bottom'
    });
    toast.present();
  }
  validate()
  {
    var size=this.username.length;
    if (size>8)
    {
      this.username=this.username.substring(0, size-1);
    }
  }
}
