import { LoadingPage } from './../pages/loading/loading';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
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
import { ProductProvider } from '../shared/providers/ProductProvider';
import { ArrayProductProvider } from '../providers/Array/ArrayProductProvider';
import { ArrayColorProvider } from '../providers/Array/ArrayColorProvider';
import { ColorProvider } from '../shared/providers/ColorProvider';
import { WordDragDropProvider } from '../shared/providers/WordDragDropProvider';
import { DragulaWordDragDropProvider } from '../providers/Dragula/DragulaWordDragDropProvider';
import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../shared/providers/AudioProvider';
import { NativeAudioProvider } from '../providers/Native/NativeAudioProvider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListaPage,
    WordPage,
    ProductsPage, 
    LevelCompletePage,
    LoadingPage
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
    LoadingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    DragulaService,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ProductProvider, useClass: ArrayProductProvider},
    {provide: ColorProvider, useClass: ArrayColorProvider},
    {provide: WordDragDropProvider, useClass: DragulaWordDragDropProvider, deps: [DragulaService, Platform]},
    {provide: AudioProvider, useClass: NativeAudioProvider, deps: [NativeAudio]}
  ]
})
export class AppModule { }
