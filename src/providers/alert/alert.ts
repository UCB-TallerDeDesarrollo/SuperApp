import { Injectable } from '@angular/core';

@Injectable()
export class AlertProvider {

  constructor() {}

  public generateBasicAlert(title: string, 
                            message: string, 
                            textButton: string, 
                            callbackButton){
    return {
      title: title,
      message: message,
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
                                   disagreeCallback){
    return {
      title: title,
      message: message,
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
