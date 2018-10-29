import { LoginStatus } from './../login/LoginStatus';
import { Injectable } from "@angular/core";

@Injectable()
export class UserProgressProvider{
    public start():void{
        if (LoginStatus.logged)
        {
            
        }
    }
}