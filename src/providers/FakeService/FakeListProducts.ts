
export class FakeListProducts {

    static products: Array<{id: number, title: string, image: string, categoryId: number}>= [];

    static getProducts(){
        return this.products;
    }

    static addProduct(product: {id: number, title: string, image:string, categoryId: number}){
        this.products.push(product);
    }
    
    static removeProduct(indexProduct: number){
        this.products.splice(indexProduct,1);
    }

    static deleteAllProducts(){
        this.products=[];
    } 

    static getQuantityOfProducts() {
        return this.products.length;
    }
}