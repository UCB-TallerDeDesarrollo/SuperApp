export abstract class AudioProvider {
    abstract playCorrectLetterSound(): void;
    abstract changeState():void;
    abstract isMuted():boolean;
}
