
export class FakeListProducts {

    static products: Array<{id: number, title: string, image: string}>= [];

    static getProducts(){
        return this.products;
    }

    static addProduct(product: {id: number, title: string, image:string}){
        this.products.push(product);
    }
    
    static deleteProduct(product_id: number){
        this.products.splice(product_id);
    }
}