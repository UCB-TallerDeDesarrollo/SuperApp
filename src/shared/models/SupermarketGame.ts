import { Product } from "./product.model";
import { ArrayManager } from "../../Managers/ArrayManager";
import { ProductsProvider } from '../../providers/product/product'; 

export class SuperMarketGame {
    
    private countOfProducts : number;
    private products: any = [];
    private productsToPlay : any = [];
    private productsToBuy : any= []; 
 

    public constructor(products: any[]) {
        this.countOfProducts = 0;
        this.products = products; 
    }


    public buildProducts(numberOfProductsToPlay:number,numberOfProductsToBuy:number) : void {
        this.productsToPlay = ArrayManager.getManyRandomElements(numberOfProductsToPlay,this.products); 
        this.productsToBuy = ArrayManager.getManyRandomElements(numberOfProductsToBuy,this.productsToPlay); 
    }

    public showProducts(){
        console.log("NEW PRODUCTS");
        console.log("#######PRODUCTS TO BUY########");
        for(let i = 0;i<this.productsToBuy.length;i++){
            console.log(this.productsToBuy[i].image);
        }
        console.log("#######PRODUCTS TO PLAY########");
        for(let i = 0;i<this.productsToPlay.length;i++){
            console.log(this.productsToPlay[i].image);
        } 
    }
 

    public get ProductsToPlay() : any[] {
        return this.productsToPlay;
    }

    public get ProductsToBuy() : any[] {
        return this.productsToBuy;
    }

    public get Products() : any[] {
        return this.products;
    }
}
