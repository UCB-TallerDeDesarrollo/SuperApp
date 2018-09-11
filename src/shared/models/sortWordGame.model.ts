import { Product } from "./product.model";
import { ArrayManager } from "../../Managers/ArrayManager";

export class SortWordGame {
    
    private count         : number;
    private product       : Product;
    private messyLetters  : any;
    private sortedLetters : any;
    
    public constructor() {
        this.count = 0;
        this.product = null;
        this.messyLetters = [];
        this.sortedLetters = [];
    }

    public addCount() : void {
        ++this.count;
    }

    public isGameOver() : boolean {
        return this.count >= this.product.Title.length;
    }

    public buildLetters(lettersColor: any) : void {
        let auxilaryLetters: any = [];
        do {
            for (let letter of this.ResponseWord) {
                auxilaryLetters.push({
                    letter: letter,
                    color: lettersColor[letter],
                    name: `letter-${letter}`
                });
            }
            this.sortedLetters = auxilaryLetters.map(data => ({letter: data.letter, color: data.color, name: data.name}));
            while (auxilaryLetters.length > 0) {
                let data: any = ArrayManager.get_random_element(auxilaryLetters);
                this.messyLetters.push({
                    letter: data.letter,
                    color: data.color,
                    name: `letter-${data.letter}`
                });
                auxilaryLetters.splice(auxilaryLetters.indexOf(data), 1);
            }
        } while (JSON.stringify(this.sortedLetters) === JSON.stringify(this.messyLetters));
    }

    public get Product(): Product {
        return this.product;
    }

    public get ResponseWord(): string {
        return this.product.Title;
    }

    public get MessyWord() : any {
        return this.messyLetters;
    }

    public get SortedWord() : any {
        return this.sortedLetters;
    }

    public set Product(product: Product) {
        this.product = product;
    }

}
