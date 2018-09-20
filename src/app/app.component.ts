import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { createConnection } from 'typeorm';

import { HomePage } from '../pages/home/home';

import { Product } from '../entities/product';
import { Category } from '../entities/category';
import { Level } from '../entities/level';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(async () => {
      statusBar.styleDefault();
      this.hideSplashScreen(splashScreen);

      if (platform.is('cordova')) {
        await createConnection({
          type: 'cordova',
          database: 'test',
          location: 'default',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [
            Category,
            Product,
            Level
          ]
        }); 
      } else {
        await createConnection({
          type: 'sqljs',
          autoSave: true,
          location: 'browser',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          dropSchema: true,
          entities: [
            Category,
            Product,
            Level
          ]
        });
      }
    });
  }

  hideSplashScreen(splashScreen) {
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
    }
  }
}
