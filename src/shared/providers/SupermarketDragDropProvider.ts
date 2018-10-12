export abstract class SupermarketDragDropProvider {
    abstract initialize(selectorName: string, supermarketPage: any): void;
    abstract startEvents(selectorName: string, supermarketPage: any): void;
    abstract finalize(selectorName: string): void;
}
