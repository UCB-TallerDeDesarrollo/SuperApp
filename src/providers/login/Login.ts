import { LoginStatus } from './LoginStatus';
import { UserProvider } from '../user/user';
import { Injectable } from '@angular/core';

@Injectable()
export class Login{

    constructor(public userProvider:UserProvider){
        
    }
    public async login(username:string)
    {
        var existUser:boolean=await this.userProvider.existsUsername(username);
        if (existUser)
        {
            LoginStatus.setLoginSuccess(username);
        }
        return existUser;
    }
    public async logout()
    {
        LoginStatus.setLogout();
    }
}