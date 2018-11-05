import { Product } from "./Product.model";
import { ArrayManager } from "../../Managers/ArrayManager";

export class SortWordGame {
    
    private count         : number;
    private product       : Product;
    private messyLetters  : any;
    private sortedLetters : any;
    private level         : number;

    private static readonly LETTERS = [
        'A', 'B', 'C', 'D', 'E', 'F', 
        'G', 'H', 'I', 'J', 'K', 'L', 
        'M', 'N', 'O', 'P', 'Q', 'R', 
        'S', 'T', 'U', 'V', 'W', 'X', 
        'Y', 'Z'
    ];

    public constructor(product: Product, level: number) {
        this.count = 0;
        this.product = product;
        this.messyLetters = [];
        this.sortedLetters = [];
        this.level = level;
    }

    public setElements(product: Product, level: number) {
        this.product = product;
        this.level = level;
    }

    public addCount() : void {
        ++this.count;
    }

    public isGameOver() : boolean {
        return this.count >= this.product.Title.length;
    }

    public buildLetters(lettersColor: any) : void {
        do {
            let auxilaryLetters: any = [];
            for (let letter of this.ResponseWord) {
                auxilaryLetters.push({
                    letter: letter,
                    color: lettersColor[letter],
                    name: `letter-${letter}`
                });
            }
            this.sortedLetters = auxilaryLetters.map(data => ({letter: data.letter, color: data.color, name: data.name}));
            this.messyLetters = [];
            while (auxilaryLetters.length > 0) {
                let data: any = ArrayManager.get_random_element(auxilaryLetters);
                this.messyLetters.push({
                    letter: data.letter,
                    color: data.color,
                    name: `letter-${data.letter}`
                });
                auxilaryLetters.splice(auxilaryLetters.indexOf(data), 1);
            }
            if(this.level >= 125) {
                let randomPosition = Math.floor(Math.random() * this.messyLetters.length);
                let letter = SortWordGame.LETTERS[Math.floor(Math.random() * (SortWordGame.LETTERS.length))];
                this.messyLetters.splice(randomPosition, 0, {
                    letter: letter,
                    color: '#000000',
                    name: `letter-${letter}`
                });
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

    public get Level(): number {
        return this.level;
    }
 
    public get SortedWord() : any {
        return this.sortedLetters;
    }

    public set Product(product: Product) {
        this.product = product;
    }

}
