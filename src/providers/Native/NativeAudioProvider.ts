import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Platform } from 'ionic-angular';

export class NativeAudioProvider implements AudioProvider {
    
    private correctLetterSound : HTMLAudioElement;
    private levelComplete      : HTMLAudioElement;
    public static muted     : boolean = false;

    public constructor(private nativeAudio: NativeAudio, private platform: Platform) {
        if(this.isRealDevice()) {
            nativeAudio.preloadSimple('correctLetterSound', '../../assets/sounds/correctLetterSound.mp3');
            nativeAudio.preloadSimple('levelComplete', '../../assets/sounds/levelComplete.mp3');
        }
        else {
            this.correctLetterSound = new Audio('../../assets/sounds/correctLetterSound.mp3');
            this.levelComplete = new Audio('../../assets/sounds/levelComplete.mp3');
        }
    }

    public playCorrectLetterSound(): void {
        if(NativeAudioProvider.muted == false)
        {
            if(this.isRealDevice()) {
                this.nativeAudio.play('correctLetterSound');
            }
            else {
                (<HTMLAudioElement>this.correctLetterSound.cloneNode(true)).play();
            }   
        } 
    }
   
    public isMuted(){
        return NativeAudioProvider.muted;
    }
    public leveCompleteMute(){
       this.levelComplete.muted=true;
       this.levelComplete.volume=0.0;
       this.nativeAudio.setVolumeForComplexAsset('levelComplete', 0.0);
    }
    public leveCompleteUnMute(){
        this.levelComplete.muted=false;
        this.levelComplete.volume=0.8;
        this.nativeAudio.setVolumeForComplexAsset('levelComplete', 0.8);
     }
     public correctLetterSoundUnmute(){
        this.correctLetterSound.muted=false;
        this.correctLetterSound.volume = 0.8;
        this.nativeAudio.setVolumeForComplexAsset('correctLetterSound', 0.8);
     }
     public correctLetterSoundMute(){
        this.correctLetterSound.muted=true;
        this.correctLetterSound.volume = 0.0;
        this.nativeAudio.setVolumeForComplexAsset('correctLetterSound', 0.0);
     }
    changeState():void{
        if (NativeAudioProvider.muted==true) {
            this.correctLetterSoundUnmute();
            this.leveCompleteUnMute();
            NativeAudioProvider.muted=false;
        }    
        else {   
            this.correctLetterSoundMute();
            this.leveCompleteMute();
            NativeAudioProvider.muted=true;
        }
    }

    public playLevelCompleteSound(): void {
        if(NativeAudioProvider.muted == false)
        {
            if(this.isRealDevice()) {
                this.nativeAudio.play('levelComplete');
            }
            else {
                (<HTMLAudioElement>this.levelComplete.cloneNode(true)).play();
            }
        }
    }

    private isRealDevice(): boolean {
        return this.platform.is('cordova');
    }
}
