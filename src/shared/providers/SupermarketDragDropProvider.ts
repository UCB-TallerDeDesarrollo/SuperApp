export abstract class SupermarketDragDropProvider {
    abstract initialize(selectorName: string): void;
    abstract startEvents(selectorName: string, wordPage: any): void;
    abstract finalize(selectorName: string): void;
}
