export class Product {

    private id: number;
    private title: string;
    private image: string;

    public constructor() {
        this.id = -1;
        this.title = '';
        this.image = '';
    }

    public static createProduct(id: number, title: string, image: string) : Product {
        let response = new Product();
        response.id = id;
        response.title = title;
        response.image = image;
        return response;
    }

    public get Id() : number {
        return this.id;
    }

    public get Title() : string {
        return this.title;
    }

    public get ImageURL() : string {
        return this.image;
    }
}
