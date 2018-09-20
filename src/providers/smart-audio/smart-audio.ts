import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
 
@Injectable()
export class SmartAudio {
 
    audioType: string = 'native';
    sounds: any = [];
    public static isMuted:boolean=false;   
    constructor(public nativeAudio: NativeAudio, platform: Platform) {
 
        if(platform.is('cordova')){
            this.audioType = 'native';
        }
 
    }
    

    preload(key, asset) {
 
        if(this.audioType === 'html5'){
 
            let audio = {
                key: key,
                asset: asset,
                type: 'html5'
            };
 
            this.sounds.push(audio);
 
        } else {
 
            this.nativeAudio.preloadSimple(key, asset);
 
            let audio = {
                key: key,
                asset: key,
                type: 'native'
            };
 
            this.sounds.push(audio);
        }      
 
    }
 
    play(key){
        if (!SmartAudio.isMuted)
        {
        let audio = this.sounds.find((sound) => {
            return sound.key === key;
        });
 
        if(audio.type === 'html5'){
 
            let audioAsset = new Audio(audio.asset);
            audioAsset.loop = true;
            audioAsset.play();
 
        } else {
 
            this.nativeAudio.loop(audio.asset).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
 
        }
    }
    }
    stop(key){
 
        let audio = this.sounds.find((sound) => {
            return sound.key === key;
        });
 
        if(audio.type === 'html5'){
            let audioAsset = new Audio(audio.asset); 
            audioAsset.muted;
        } else {
            this.nativeAudio.stop(audio.asset).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
 
        }
 
    }

    mute()
    {
        this.stop("mainSong");
        SmartAudio.isMuted=true;
    }
    unmuted()
    {
        this.play("mainSong");
        SmartAudio.isMuted=false;
    }
    isMuted(){
        return SmartAudio.isMuted;
    }
    changeState():void{
        if (this.isMuted())
        {
            this.unmuted();
        }    
        else
        {
            this.mute();
        }
    }
}