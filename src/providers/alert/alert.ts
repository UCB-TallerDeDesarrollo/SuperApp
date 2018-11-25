import { Injectable } from '@angular/core';

@Injectable()
export class AlertProvider {

  constructor() {}

  public generateBasicAlert(title: string, 
                            message: string, 
                            textButton: string, 
                            callbackButton,
                            cssClass: string){
    return {
      title: title,
      message: message,
      cssClass: cssClass,
      buttons: [
        {
          text: textButton,
          handler: () => {
            callbackButton();
          }
        }
      ]
    }
  }

  public generateConfirmationAlert(title: string, 
                                   message: string, 
                                   agreeButtonText: string, 
                                   agreeCallback, 
                                   disagreeButtonText: string, 
                                   disagreeCallback,
                                   cssClass: string){
    return {
      title: title,
      message: message,
      cssClass: cssClass,
      buttons: [
        {
          text: agreeButtonText,
          handler: () => {
            agreeCallback();
          }
        },
        {
          text: disagreeButtonText,
          handler: () => {
            disagreeCallback();
          }
        }
      ]
    };
  }

}
