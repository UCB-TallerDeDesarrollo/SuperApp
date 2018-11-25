import { Injectable } from '@angular/core';

@Injectable()
export class AlertProvider {

  constructor() {}

  public generateBasicAlert(title: string, message: string, textButton: string, callbackButton){
    return {
      title: title,
      message: message,
      buttons: [
        {
          text: textButton,
          handler: () => {
            if(callbackButton)
              callbackButton();
          }
        }
      ]
    }
  }

}
