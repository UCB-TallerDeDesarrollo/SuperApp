import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../../shared/providers/AudioProvider';

export class NativeAudioProvider implements AudioProvider {
    
    private correctLetterSound = new Audio('../../assets/sounds/correctLetterSound.mp3');

    public constructor(private nativeAudio: NativeAudio) {
        //nativeAudio.preloadSimple('correctLetterSound', '../../assets/sounds/correctLetterSound.mp3').then(onSuccess, onError);
        this.correctLetterSound.volume = 0.2;
    }

    public playCorrectLetterSound(): void {
        //this.nativeAudio.play('correctLetterSound');
        this.correctLetterSound.play();
    }

}
