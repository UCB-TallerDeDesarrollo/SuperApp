import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../../shared/providers/AudioProvider';

export class NativeAudioProvider implements AudioProvider {
    
    private correctLetterSound : HTMLAudioElement;
    private levelComplete      : HTMLAudioElement;
    
    public constructor(private nativeAudio: NativeAudio) {
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
            this.correctLetterSound.play();
        }
    }

    public playWinGameSound(): void {
        if(this.isRealDevice()) {
            this.nativeAudio.play('levelComplete');
        }
        else {
            this.levelComplete.play();
        }
    }

    private isRealDevice(): boolean {
        return document.URL.indexOf('http') !== 0;
    }
}
