import { LoginStatus } from './LoginStatus';
import { UserProvider } from '../user/user';
import { Injectable } from '@angular/core';
import { User } from '../../entities/user';

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
    async  loadingGameData() {
        if (LoginStatus.logged)
        {
            var existUser:User=await this.userProvider.getUserByUsername(LoginStatus.username);
            LoginStatus.setUser(existUser);
            LoginStatus.setUserProgress(existUser.userProgress);
        }
        else{
            var existUser:User=await this.userProvider.getUserByUsername("anonimus");
            LoginStatus.setUser(existUser);
            LoginStatus.setUserProgress(existUser.userProgress);
        }
      }
      async saveProgress(level:number)
      {
          LoginStatus.userProgress.nextLevel(level);
        this.userProvider.updateProgress(level);
      }
      async saveProgressSuper(level:number)
      {
        this.userProvider.updateProgressSuper(level);
      } 
      async updateCoins(){
        this.userProvider.updateCoins();
      }
 
}