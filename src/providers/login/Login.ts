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
      async saveProgress(level:number, isBuy:boolean)
      {
          LoginStatus.userProgress.nextLevel(level, isBuy);
            await this.userProvider.updateProgress(level, isBuy);
      }
      async saveProgressSuper(level:number)
      {
        LoginStatus.userProgress.nextLevelSuper(level);
        this.userProvider.updateProgressSuper(level);
      } 
      async updateCoins(){
        LoginStatus.userProgress.updateCoins();
        this.userProvider.updateCoins();
      }
      async buyLevel(){
        LoginStatus.userProgress.buyLevel();
       await this.userProvider.buyLevel();
       
      }

 
}