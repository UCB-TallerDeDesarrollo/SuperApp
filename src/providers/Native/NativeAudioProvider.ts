import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../../shared/providers/AudioProvider';

export class NativeAudioProvider implements AudioProvider {
    
    private correctLetterSound: HTMLAudioElement;

    public constructor(private nativeAudio: NativeAudio) {
        if(this.isRealDevice()) {
            nativeAudio.preloadSimple('correctLetterSound', '../../assets/sounds/correctLetterSound.mp3');
        }
        else {
            this.correctLetterSound = new Audio('../../assets/sounds/correctLetterSound.mp3');
            this.correctLetterSound.volume = 0.2;
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

    private isRealDevice(): boolean {
        return document.URL.indexOf('http') !== 0;
    }
}
