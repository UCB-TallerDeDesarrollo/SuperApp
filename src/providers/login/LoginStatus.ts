export class LoginStatus{
    
    public static username:string="";
    public static logged:boolean=false;

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