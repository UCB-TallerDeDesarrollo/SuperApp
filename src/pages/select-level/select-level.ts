import { Login } from './../../providers/login/Login';
import { LoadingPage } from './../loading/loading';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { LoginStatus } from '../../providers/login/LoginStatus';

@Component({
  selector: 'page-select-level',
  templateUrl: 'select-level.html',
})
export class SelectLevelPage {
  public level        :   number;
  public levelEnabled:boolean;
  public levelAvaiableToUnlock:boolean;
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
    public login          : Login,
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
    this.setupUnlockedLevels();
  }

  loadLevels(){
    if(this.typeOfGame==="supermarket"){
      this.minLevel=this.navParams.get("minLevel"); 
    }else{
      this.minLevel=1;
    }
    this.maxLevel=200;
  }

  goToLevel()
  { 
    this.viewCtrl.dismiss(); 
    this.navCtrl.push(LoadingPage, {lastNav:this.navCtrl, level:this.level, typeOfGame:this.typeOfGame,maxLevel:this.maxLevel});
    this.navCtrl.remove(this.navCtrl.length()-1);
  }
  ionViewDidLoad() {
    
  }
  async unlockLevel(){
    await this.login.saveProgress(this.level-1);
    this.setupUnlockedLevels();
  }
  next()
  {
    this.level++;
    this.setupUnlockedLevels();
  }
  setupUnlockedLevels()
  {
    this.levelEnabled=this.thisLevelIsUnlocked();
    this.levelAvaiableToUnlock=this.isAvaiableToUnlocked();
  }
  previus()
  {
    this.level--;
    if (this.level<1)
    {
      this.level=1;
    }
    this.setupUnlockedLevels();
  }
  isAvaiableToUnlocked()
  {
    let easyLevel=LoginStatus.userProgress.easyLevel;
    let mediumLevel=LoginStatus.userProgress.mediumLevel;
    let hardLevel=LoginStatus.userProgress.hardLevel;
    let extremeLevel=LoginStatus.userProgress.extremeLevel;
    if (this.level>0 && this.level<16)
    {
      return this.level==easyLevel+1;
    }
    if (this.level>=16 && this.level<31)
    {
      return this.level==mediumLevel+1;
    }
    if (this.level>=31 && this.level<46)
    {
      return this.level==hardLevel+1;
    }
    if (this.level>=125)
    {
      return this.level==extremeLevel+1;
    }
  }
  thisLevelIsUnlocked()
  {
    
    let easyLevel=LoginStatus.userProgress.easyLevel;
    let mediumLevel=LoginStatus.userProgress.mediumLevel;
    let hardLevel=LoginStatus.userProgress.hardLevel;
    let extremeLevel=LoginStatus.userProgress.extremeLevel;
    if (this.level>0 && this.level<16)
    {
      return this.level<=easyLevel;
    }
    if (this.level>=16 && this.level<31)
    {
      return this.level<=mediumLevel;
    }
    if (this.level>=31 && this.level<46)
    {
      return this.level<=hardLevel;
    }
    if (this.level>=125)
    {
      return this.level<=extremeLevel;
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
