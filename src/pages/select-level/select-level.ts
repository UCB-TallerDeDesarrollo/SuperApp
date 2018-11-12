import { LoadingPage } from './../loading/loading';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AudioProvider } from '../../shared/providers/AudioProvider';

@Component({
  selector: 'page-select-level',
  templateUrl: 'select-level.html',
})
export class SelectLevelPage {
  public level        :   number;
  public minLevel: number;
  public actualLevel  :   number;
  private lastNav     :   NavController;
  public maxLevel     :   number;
  public imageSound   :   String;
  public gamePage     :   any;
  public typeOfGame : any;
  constructor(
    public navCtrl        : NavController,
    public navParams      : NavParams,
    public viewCtrl       : ViewController,
    private audioProvider : AudioProvider)
     {
    this.level=this.navParams.get("level");
    this.typeOfGame=navParams.get("typeOfGame"); 
    this.loadLevels(); 
    this.lastNav=this.navParams.get("lastNav");
    this.gamePage=this.navParams.get("gamePage");
    this.actualLevel=this.level;
    this.navCtrl=this.lastNav;
    this.changeSoundIcon();
  }

  loadLevels(){
    if(this.typeOfGame==="supermarket"){
      this.minLevel=this.navParams.get("minLevel"); 
    }else{
      this.minLevel=1;
    }
    this.maxLevel=this.navParams.get("maxLevel");
  }

  goToLevel()
  { 
    this.viewCtrl.dismiss(); 
    this.navCtrl.push(LoadingPage, {lastNav:this.navCtrl, level:this.level, typeOfGame:this.typeOfGame,maxLevel:this.maxLevel});
    this.navCtrl.remove(this.navCtrl.length()-1);
  }
  ionViewDidLoad() {
    
  }
  next()
  {
    this.level++;
  }
  previus()
  {
    this.level--;
    if (this.level<1)
    {
      this.level=1;
    }

    
  }
  public changeSoundIcon(){
    if(this.audioProvider.isMuted()){
      this.imageSound="assets/imgs/soundoff.png";
    }
    else{
      this.imageSound="assets/imgs/soundon.png";
    }
  }
   public stopSound(){
        this.audioProvider.changeState();
        this.gamePage.changeSoundIcon();
        this.changeSoundIcon();
    }
}
