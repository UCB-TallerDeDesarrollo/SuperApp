import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  //constructor(public navCtrl: NavController, public navParams: NavParams) {}
  bloque1:boolean
  bloque2:boolean
  bloque3:boolean
  bloque4:boolean
  bloque5:boolean
  bloque6:boolean
  bloque7:boolean
  bloque8:boolean

  constructor() { }

  ngOnInit() {
    this.bloque1=false
    this.bloque2=false
    this.bloque3=false
    this.bloque4=false
    this.bloque5=false
    this.bloque6=false
    this.bloque7=false
    this.bloque8=false
  }

  showHideBloque1(){
    if(this.bloque1==false) 
      this.bloque1=true
    else if (this.bloque1==true)
      this.bloque1=false
  }
  showHideBloque2(){
    if(this.bloque2==false) 
      this.bloque2=true
    else if (this.bloque2==true)
      this.bloque2=false
  }
  showHideBloque3(){
    if(this.bloque3==false) 
      this.bloque3=true
    else if (this.bloque3==true)
      this.bloque3=false
  }
  showHideBloque4(){
    if(this.bloque4==false) 
      this.bloque4=true
    else if (this.bloque4==true)
      this.bloque4=false
  }
  showHideBloque5(){
    if(this.bloque5==false) 
      this.bloque5=true
    else if (this.bloque5==true)
      this.bloque5=false
  }
  showHideBloque6(){
    if(this.bloque6==false) 
      this.bloque6=true
    else if (this.bloque6==true)
      this.bloque6=false
  }
  showHideBloque7(){
    if(this.bloque7==false) 
      this.bloque7=true
    else if (this.bloque7==true)
      this.bloque7=false
  }
  showHideBloque8(){
    if(this.bloque8==false) 
      this.bloque8=true
    else if (this.bloque8==true)
      this.bloque8=false
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
