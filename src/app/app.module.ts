import { LoadingPage } from './../pages/loading/loading';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListaPage } from '../pages/lista/lista';
import { WordPage } from '../pages/word/word';
import { ProductsPage } from '../pages/products/products';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { LevelCompletePage } from '../pages/level-complete/level-complete';
import { ProductProvider } from '../providers/product/product';
import { CreateProductPage } from '../pages/create-product/create-product';
import { CategoryProvider } from '../providers/category/category';
import { LevelProvider } from '../providers/level/level';
import { ProductLevelProvider } from '../providers/product-level/product-level';
import { ProductsEditorPage } from '../pages/products-editor/products-editor';
import { EditProductPage } from '../pages/edit-product/edit-product';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListaPage,
    WordPage,
    ProductsPage, 
    LevelCompletePage,
    LoadingPage,
    CreateProductPage,
    ProductsEditorPage,
    EditProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DragulaModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListaPage,
    WordPage,
    ProductsPage, 
    LevelCompletePage,
    LoadingPage,
    CreateProductPage,
    ProductsEditorPage,
    EditProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    DragulaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductProvider,
    CategoryProvider,
    LevelProvider,
    ProductLevelProvider
  ]
})
export class AppModule {
}
