export abstract class WordDragDropProvider {
    abstract initialize(selectorName: string): void;
    abstract startEvents(dropCallBack: any): void;
    abstract finalize(): void;
}
