import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Platform } from 'ionic-angular';

export class NativeAudioProvider implements AudioProvider {
    
    private correctLetterSound : HTMLAudioElement;
    private levelComplete      : HTMLAudioElement;
    
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
