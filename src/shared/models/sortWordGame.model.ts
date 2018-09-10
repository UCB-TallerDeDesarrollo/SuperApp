import { Product } from "./product.model";

export class SortWordGame {
    
    private count: number;      // CONTADOR DE RESPONDIDOS
    private product: Product;      // PRODUCTO
    private messy_letters: any;   // LETRAS DESORDENADAS
    private sorted_letters: any;   // LETRAS ORDENADAS
    private image_route: string;    // SRC DE LA IMAGEN
    
    public constructor() {
        this.count = 0;
        this.product = null;
        this.messy_letters = [];
        this.sorted_letters = [];
        this.image_route = '';
    }

    public addCount() : void {
        ++this.count;
    }

    public isGameOver() : boolean {
        return this.count >= this.product.Title.length;
    }

    public get Product(): Product {
        return this.product;
    }

    public get ResponseWord(): string {
        return this.product.Title;
    }

    public set Product(product: Product) {
        this.product = product;
    }

}
