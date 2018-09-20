export abstract class AudioProvider {
    abstract playCorrectLetterSound(): void;
    abstract playMainSound(): void;
    abstract stopMainSound(): void;
    abstract changeState():void;
}
