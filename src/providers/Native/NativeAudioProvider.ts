import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../../shared/providers/AudioProvider';

export class NativeAudioProvider implements AudioProvider {
    
    public constructor(private nativeAudio: NativeAudio) { 
        nativeAudio.preloadSimple('correctLetterSound', '../../assets/sounds/correctLetterSound.mp3');
    }

    public playCorrectLetterSound(): void {
        this.nativeAudio.play('correctLetterSound');
    }

}
