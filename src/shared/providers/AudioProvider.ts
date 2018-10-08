export abstract class AudioProvider {
    abstract playCorrectLetterSound(): void;
    abstract changeState():void;
    abstract isMuted():boolean;
    abstract playLevelCompleteSound(): void;
    abstract playPronunciationOfTheProductName(productName: string): void;
}
