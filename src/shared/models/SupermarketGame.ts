import { Product } from "./Product.model";
import { ArrayManager } from "../../Managers/ArrayManager";
import { ProductsProvider } from '../../providers/product/product'; 

export class SuperMarketGame {
  
    
    private countOfProducts : number;
    private products: any = [];
    private productsToPlay : any = [];
    private productsToBuy : any= []; 
    private level: number;
    private maxLevel: number;
    private minLevel: number;
    private difficulty: number;
    public isAdvancedLevel: boolean;
    public constructor(products: any[],level: any,maxLevel:any) {
        this.countOfProducts = 0;
        this.products = products; 
        this.level = level;
        this.setMinLevel();
        this.maxLevel=maxLevel;
        this.setDifficulty();
        this.isAdvancedLevel=false;
    }

    private setDifficulty(){
        if(this.levelBetween(1,15)){ 
            this.difficulty=0;  
        }else if(this.levelBetween(16,30)){ 
            this.difficulty=1;  
        }else if(this.levelBetween(31,45)){  
            this.difficulty=2;  
        }else if(this.levelBetween(46,60)){  
            this.difficulty=3;  
        } 
    }

    private setMinLevel(){
        if(this.levelBetween(1,15)){ 
            this.minLevel=1;  
        }else if(this.levelBetween(16,30)){ 
            this.minLevel=16;  
        }else if(this.levelBetween(31,45)){  
            this.minLevel=31;  
        }else if(this.levelBetween(46,60)){  
            this.minLevel=46;  
        } 
    }
    
    private levelBetween(minLevel,maxLevel) {
        return this.level >= minLevel && this.level < maxLevel+1;
    } 

    public getQuantityByLevel(){
        if(this.levelBetween(1,15)){
            this.isAdvancedLevel=false;
            return this.getQuantityFromEasyMode(this.level);
        }else if(this.levelBetween(16,30)){ 
            this.isAdvancedLevel=false;
            return this.getQuantityFromMediumMode(this.level);
        }else if(this.levelBetween(31,45)){ 
            this.isAdvancedLevel=true;
            return this.getQuantityFromHardMode(this.level);
        }else if(this.levelBetween(46,60)){ 
            this.isAdvancedLevel=true;
            return this.getQuantityFromExpertMode(this.level);
        }
    }

    private getQuantityFromEasyMode(level){
        if(this.levelBetween(1,3)){
            return 8;
        }
        if(this.levelBetween(4,6)){
            return 9;
        }
        if(this.levelBetween(7,9)){
            return 10;
        }
        if(this.levelBetween(10,12)){
            return 11;
        }
        if(this.levelBetween(13,15)){
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

    public buildProducts(listId){
        let numberOfProductsToPlay = this.getQuantityByLevel();
        if(listId){
            
        }else{
            this.createProducts(numberOfProductsToPlay, 6);
        }
    }

    private createProducts(numberOfProductsToPlay:number,numberOfProductsToBuy:number) : void {
        this.productsToPlay = ArrayManager.getManyRandomElements(numberOfProductsToPlay,this.products); 
        this.productsToBuy = ArrayManager.getManyRandomElements(numberOfProductsToBuy,this.productsToPlay); 
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

    public get Level(): number{
        return this.level;
    }

    public get CountOfProducts(): any{
        return this.countOfProducts;
    }

    public get MaxLevel(): number{
        return this.maxLevel;
    }

    public get MinLevel(): number{
        return this.minLevel;
    }

    public get Difficulty() : number{
        return this.difficulty;
    }
     
    public addPoint(): void {
        this.countOfProducts++;
    }
}
