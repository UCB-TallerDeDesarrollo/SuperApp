import { Component } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { ViewUserPage } from '../view-user/view-user';
import { UserLoginPage } from '../user-login/user-login';
import { CreateUserPage } from '../create-user/create-user';
import { EditUserPage } from '../edit-user/edit-user';
import { DeleteUserPage } from '../delete-user/delete-user';
import { LoginStatus } from '../../providers/login/LoginStatus';
import { EditUserOptionsPage } from '../edit-user-options/edit-user-options';

@Component({
  selector: 'page-login-options',
  templateUrl: 'login-options.html',
})
export class LoginOptionsPage {

  public iconLeft:string;
  public iconTop:string;
  private loged_items:any;
  private unloged_items:any;
  Image: string;
  public userName: string;
  public userCoins: number;
  constructor(
      public navCtrl:NavController, public toastCtrl:ToastController,
      public modalCtrl:ModalController, private viewCtrl:ViewController, private navParams:NavParams
  )
  {
    
  }
  ngOnInit(){ 
    this.changeLoginIcons();
  }
  ionViewDidEnter(){ 
    var a=1;
   }
   ionViewWillEnter(){
    var a=1;
   }
  show(): any {
      this.navCtrl.push(ViewUserPage);
    }
  login()
  {
    this.navCtrl.push(UserLoginPage, {loginOptions: this});
  }
  create() {
      this.navCtrl.push(CreateUserPage);
    }
  
    async edit() {
      await this.navCtrl.push(EditUserPage, {navCtrl:this.navCtrl});
      let updated=this.navParams.get("updated");
      let a=1;
    }
  
    delete() {
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
      this.changeLoginIcons();
    }
    public changeLoginIcons() {
      this.loged_items=document.getElementById('loged_items');
       this.unloged_items=document.getElementById('unloged_items');
       this.Image=LoginStatus.getImage();
       if (LoginStatus.logged)
       {
         this.userName = LoginStatus.user.username.toUpperCase();
         this.userCoins = LoginStatus.user.userProgress.coins;
         this.loged_items.hidden=false;
         this.unloged_items.hidden=true;
       }
       else
       {this.loged_items.hidden=true;
         this.unloged_items.hidden=false;}
    }
  
    showEditUserOptions() {
      if (LoginStatus.logged) {
        const editUserOptionsModal = this.modalCtrl.create(EditUserOptionsPage, {loginOptions: this});
        editUserOptionsModal.present();
      }
    }

}
