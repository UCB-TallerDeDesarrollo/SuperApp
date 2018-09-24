import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Platform } from 'ionic-angular';

export class NativeAudioProvider implements AudioProvider {
    
    private correctLetterSound : HTMLAudioElement;
    private levelComplete      : HTMLAudioElement;
    public static isMuted      : boolean = false;

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
        if(this.isRealDevice()) {
            this.nativeAudio.play('correctLetterSound');
        }
        else {
            (<HTMLAudioElement>this.correctLetterSound.cloneNode(true)).play();
        }
    }
   
    public isMuted(){
        return NativeAudioProvider.isMuted;
    }
    
    changeState():void{
        if (NativeAudioProvider.isMuted==true)
        {

            this.correctLetterSound.muted=false;
            this.correctLetterSound.volume = 0.8;
            NativeAudioProvider.isMuted=false
        }    
        else
        {   
            this.correctLetterSound.muted=true;
            this.correctLetterSound.volume = 0.0;
            NativeAudioProvider.isMuted=true;
        }
    }

    public playLevelCompleteSound(): void {
        if(this.isRealDevice()) {
            this.nativeAudio.play('levelComplete');
        }
        else {
            (<HTMLAudioElement>this.levelComplete.cloneNode(true)).play();
        }
    }

    private isRealDevice(): boolean {
        return this.platform.is('cordova');
    }
}
