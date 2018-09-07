import { ArrayManager } from './../../Managers/ArrayManager';

let path_images = '../../assets/imgs/Products/'

export class FakeProducts{
  
    static products: Array<{id: number, title: string, image: string, state: number}>= [
        {id: 1, title: 'ARROZ', image: path_images+'arroz.jpg', state:0},
        {id: 2, title: 'ATUN', image: path_images+'atun.jpg', state:0},
        {id: 3, title: 'AZUCAR', image: path_images+'azucar.jpg', state:0},
        {id: 4, title: 'BANANA', image: path_images+'banana.jpg', state:0},
        {id: 5, title: 'CARNE', image: path_images+'carne.jpg', state:0},
        {id: 6, title: 'CAFE', image: path_images+'cafe.jpg', state:0},
        {id: 7, title: 'ARVEJA', image: path_images+'arveja.jpg', state:0},
        {id: 8, title: 'BROCOLI', image: path_images+'brocoli.jpg', state:0},
        {id: 9, title: 'BATATA', image: path_images+'batata.jpg', state:0},
        {id: 10, title: 'CEBOLLA', image: path_images+'cebolla.jpg', state:0},
        {id: 11, title: 'CEREAL', image: path_images+'cereal.jpg', state:0},
        {id: 12, title: 'TOMATE', image: path_images+'tomate.jpg', state:0},
        {id: 13, title: 'PURE', image: path_images+'pure.jpg', state:1},
        {id: 14, title: 'TE', image: path_images+'te.jpg', state:1},
        {id: 15, title: 'UVA', image: path_images+'uva.jpg', state:1}
    ];

    static getProducts(){
        return this.products;
    } 

    static setStateOfSomeProducts(products: any,newState: number){
        for(let product in products){
            products[product].state=newState;
        }
    }

    static isInStore(product: any){
        if(product.state === 0){
            return true;
        }
        return false;
    }

    static getProductsInStore() {
        const list = [];
        for(let product in this.products){
            if(this.isInStore(this.products[product])){
                list.push(this.products[product]);
            }
        }
        return list;
    }

    static getProductsInShoppingCar() {
        const list = [];
        for(let product in this.products){
            if(!this.isInStore(this.products[product])){
                list.push(this.products[product]);
            }
        }
        return list;
    }

    static getProductById(id: number){
        return this.products[id];
    }
    static get_random_product(): any {
        return ArrayManager.get_random_element(this.products);
    }
}