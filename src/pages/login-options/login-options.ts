import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { ViewUserPage } from '../view-user/view-user';
import { UserLoginPage } from '../user-login/user-login';
import { CreateUserPage } from '../create-user/create-user';
import { EditUserPage } from '../edit-user/edit-user';
import { DeleteUserPage } from '../delete-user/delete-user';
import { LoginStatus } from '../../providers/login/LoginStatus';

@Component({
  selector: 'page-login-options',
  templateUrl: 'login-options.html',
})
export class LoginOptionsPage {

  public iconLeft:string;
  public iconTop:string;
  private loged_items:any;
  private unloged_items:any;
  constructor(
      public navCtrl:NavController, public toastCtrl:ToastController,
      public modalCtrl:ModalController
  )
  {
  }
  ngOnInit(){ 
    this.changeLoginIcons();
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
  
    edit() {
      this.navCtrl.push(EditUserPage);
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
       if (LoginStatus.logged)
       {
         this.loged_items.hidden=false;
         this.unloged_items.hidden=true;
       }
       else
       {this.loged_items.hidden=true;
         this.unloged_items.hidden=false;}
     }
}
