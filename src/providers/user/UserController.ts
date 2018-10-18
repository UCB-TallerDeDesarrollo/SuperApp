import { Injectable, Component } from "@angular/core";
import { NavController, App, ToastController } from "ionic-angular";
import { UserLoginPage } from "../../pages/user-login/user-login";
import { LoginStatus } from "../login/LoginStatus";
import { CreateUserPage } from "../../pages/create-user/create-user";
import { EditUserPage } from "../../pages/edit-user/edit-user";
import { ViewUserPage } from "../../pages/view-user/view-user";

@Injectable()
@Component({})
export class UserController
{
    public iconLeft:string;
    public iconTop:string;
    private loged_items:any;
    private unloged_items:any;
    private navCtrl:NavController;
    constructor(
        public app:App, public toastCtrl:ToastController
    )
    {
        this.navCtrl=app.getActiveNav();
    }
    show(): any {
        this.navCtrl.push(ViewUserPage);
      }
    login()
    {
      this.navCtrl.push(UserLoginPage);
    }
    create() {
        this.navCtrl.push(CreateUserPage);
      }
    
      edit() {
        this.navCtrl.push(EditUserPage);
      }
    
      delete() {
        console.log('Delete precionado');
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