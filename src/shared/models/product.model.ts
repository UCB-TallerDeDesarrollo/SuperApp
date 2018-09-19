export class Product {

    private id: number;
    private title: string;
    private image: string;
    private level: number;
    public constructor() {
        this.id = -1;
        this.title = '';
        this.image = '';
        this.level=0;
    }

    public static createProduct(id: number, title: string, image: string, level:number) : Product {
        let response = new Product();
        response.id = id;
        response.title = title;
        response.image = image;
        response.level=level;
        return response;
    }

    public get Id(): number {
        return this.id;
    }

    public get Title(): string {
        return this.title;
    }

    public get ImageURL(): string {
        return this.image;
    }
    public get Level(): number {
        return this.level;
    }
    
}
