import { UserProgress } from './../../entities/userProgress';
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
        LoginStatus.username="anonimus";
        LoginStatus.logged=false;
    }
}