import { UserProgress } from './../../entities/userProgress';
import { Difficulty } from './../../entities/difficulty';
export class LoginStatus{
    
    public static username:string="anonimus";
    public static logged:boolean=false;
    public static userProgress:UserProgress;
    public static setUserProgress(userProgress:UserProgress)
    {
        this.userProgress=userProgress;
    }
    public static setLoginSuccess(username:string)
    {
        LoginStatus.username=username;
        LoginStatus.logged=true;
    }
    public static setLogout()
    {
        LoginStatus.username="";
        LoginStatus.logged=false;
    }
}