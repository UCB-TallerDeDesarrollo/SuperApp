import { UserProgress } from './../../entities/userProgress';
import { User } from '../../entities/user';
export class LoginStatus{
    
    public static username:string="anonimus";
    public static logged:boolean=false;
    public static userProgress:UserProgress;
    public static user:User;
    public static setUser(user:User)
    {
this.user=user;
    }
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
        this.user=null;
    }
    public static getImage()
    {
        return (this.user==null)?"assets/imgs/user.png":this.user.profilePictureURL;
    }
}