import { Injectable, Component } from "@angular/core";
import { NavController, App } from "ionic-angular";
import { UserLoginPage } from "../../pages/user-login/user-login";

@Injectable()
@Component({})
export class UserController
{
    private navCtrl:NavController;
    constructor(
        public app:App
    )
    {
        this.navCtrl=app.getActiveNav();
    }
    toLogin()
    {
        this.navCtrl.push(UserLoginPage);
    }
}