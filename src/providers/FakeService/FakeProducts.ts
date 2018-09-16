import { ArrayManager } from "../../Managers/ArrayManager";

let path_images = '../../assets/imgs/Products/'

export class FakeProducts{
  
    static products: Array<{id: number, title: string, image: string, categoryId: number}>= [
        {id: 1, title: 'ARROZ', image: path_images+'arroz.jpg',categoryId: 1},
        {id: 2, title: 'ATUN', image: path_images+'atun.jpg',categoryId: 1},
        {id: 3, title: 'AZUCAR', image: path_images+'azucar.jpg',categoryId: 1},
        {id: 4, title: 'BANANA', image: path_images+'banana.jpg',categoryId: 2},
        {id: 5, title: 'CARNE', image: path_images+'carne.jpg',categoryId: 3},
        {id: 6, title: 'CAFE', image: path_images+'cafe.jpg',categoryId: 1},
        {id: 7, title: 'ARVEJA', image: path_images+'arveja.jpg',categoryId: 2},
        {id: 8, title: 'BROCOLI', image: path_images+'brocoli.jpg',categoryId: 2},
        {id: 9, title: 'BATATA', image: path_images+'batata.jpg',categoryId: 2},
        {id: 10, title: 'CEBOLLA', image: path_images+'cebolla.jpg',categoryId: 2},
        {id: 11, title: 'CEREAL', image: path_images+'cereal.jpg',categoryId: 1},
        {id: 12, title: 'COCA', image: path_images+'coca.jpg',categoryId: 1}
    ];

    static getProducts(){
        return this.products;
    }

    static getProductById(id: number){ 
        for(let product in this.products){
            if(this.products[product].id===id){
                return this.products[product];
            }
        } 
        return null;
    }

    static get_random_product(): any {
        return ArrayManager.get_random_element(this.products);
    }

    static addProduct(product: {id: number, title: string, image:string, categoryId: number}){
        this.products.push(product);
    }

    static removeProduct(productId: any){
        let indexProduct = this.products.indexOf(productId);
        this.products.splice(indexProduct,1);
    }

    static addManyProducts(products: Array<{id: number, title: string, image: string, categoryId: number}>){
        for(let product in products){
            this.addProduct(products[product]);
        }
    }

    static getProductsByCategory(categoryId: number): any{
        let products: any=[];
        for(let product in this.products){
            if(this.products[product].categoryId===categoryId){
                products.push(this.products[product]);
            }
        } 
        return products;
    }
}