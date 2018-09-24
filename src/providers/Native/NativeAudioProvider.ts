import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../../shared/providers/AudioProvider';

export class NativeAudioProvider implements AudioProvider {
    
    private correctLetterSound: HTMLAudioElement;
    public static isMuted:boolean=false;   
    public constructor(private nativeAudio: NativeAudio) {
        if(this.isRealDevice()) {
            nativeAudio.preloadSimple('correctLetterSound', '../../assets/sounds/correctLetterSound.mp3');

        }
        else {
            this.correctLetterSound = new Audio('../../assets/sounds/correctLetterSound.mp3');
            this.correctLetterSound.volume = 0.8;
        }
    }

    public playCorrectLetterSound(): void {
        if(this.isRealDevice()) {
            this.nativeAudio.play('correctLetterSound');
        }
        else {
            this.correctLetterSound.play();
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
    public playWinGameSound(): void {
        if(this.isRealDevice()) {
            
        }
        else {
            
        }
    }

    private isRealDevice(): boolean {
        return document.URL.indexOf('http') !== 0;
    }
}