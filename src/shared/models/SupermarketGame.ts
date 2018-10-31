import { Product } from "./Product.model";
import { ArrayManager } from "../../Managers/ArrayManager";
import { ProductsProvider } from '../../providers/product/product'; 

export class SuperMarketGame {
  
    
    private countOfProducts : number;
    private products: any = [];
    private productsToPlay : any = [];
    private productsToBuy : any= []; 
    private level: any;
    public constructor(products: any[],level: any) {
        this.countOfProducts = 0;
        this.products = products; 
        this.level = level;
    }
    
    public getQuantityByLevel(){
        if(this.level>=1 && this.level<16){ 
            return this.getQuantityFromEasyMode(this.level);
        }else if(this.level>=16 && this.level<31){ 
            return this.getQuantityFromMediumMode(this.level);
        }else if(this.level>=31 && this.level<46){ 
            return this.getQuantityFromHardMode(this.level);
        }else if(this.level>=46 && this.level<61){ 
            return this.getQuantityFromExpertMode(this.level);
        }
    }

    private getQuantityFromEasyMode(level){
        if(level>=1 && level<4){
            return 8;
        }
        if(level>=4 && level<7){
            return 9;
        }
        if(level>=7 && level<10){
            return 10;
        }
        if(level>=10 && level<13){
            return 11;
        }
        if(level>=13 && level<16){
            return 12;
        } 
        return 8;
    }

    private getQuantityFromMediumMode(level){
        if(level>=16 && level<19){
            return 8;
        }
        if(level>=19 && level<22){
            return 9;
        }
        if(level>=22 && level<25){
            return 10;
        }
        if(level>=25 && level<28){
            return 11;
        }
        if(level>=28 && level<31){
            return 12;
        } 
        return 8;
    }

    private getQuantityFromHardMode(level){
        if(level>=31 && level<35){
            return 8;
        }
        if(level>=35 && level<39){
            return 9;
        }
        if(level>=39 && level<43){
            return 10;
        }
        if(level>=43 && level<46){
            return 11;
        } 
        return 8;
    }

    private getQuantityFromExpertMode(level){
        if(level>=46 && level<50){
            return 8;
        }
        if(level>=50 && level<54){
            return 9;
        }
        if(level>=54 && level<58){
            return 10;
        }
        if(level>=58){
            return 11;
        } 
        return 8;
    }

    public isGameOver() : boolean {
        return this.countOfProducts >= this.productsToBuy.length;
    }

    public buildProducts(){
        let numberOfProductsToPlay = this.getQuantityByLevel();
        this.createProducts(numberOfProductsToPlay,6);
    }

    private createProducts(numberOfProductsToPlay:number,numberOfProductsToBuy:number) : void {
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
 
   

    public get quantityOfPlayProducts() : number {
        return this.productsToPlay.length();
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

    public get Level(): any{
        return this.level;
    }

    public get CountOfProducts(): any{
        return this.countOfProducts;
    }
     
    public addPoint(): void {
        this.countOfProducts++;
    }
}
