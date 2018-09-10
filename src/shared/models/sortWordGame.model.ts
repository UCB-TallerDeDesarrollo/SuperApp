export class SortWordGame {
    
    private count: number;      // CONTADOR DE RESPONDIDOS
    private product: string;      // PRODUCTO
    private messy_letters: any;   // LETRAS DESORDENADAS
    private sorted_letters: any;   // LETRAS ORDENADAS
    private image_route: string;    // SRC DE LA IMAGEN
    
    public constructor() {
        this.count = 0;
        this.product = "";
        this.messy_letters = [];
        this.sorted_letters = [];
        this.image_route = "";
    }

    public addCount() : void {
        ++this.count;
    }

    public isGameOver() : boolean {
        return this.count >= this.sorted_letters.length;
    }

}
