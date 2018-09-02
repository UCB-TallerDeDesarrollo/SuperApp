import { ArrayManager } from './ArrayManager';

export class ProductManager{

    static products:string[]=
    ["arroz",
     "atun",
     "azucar",
     "cafe"];

    static get_product(){
        return ArrayManager.get_random_element(this.products);
    }
  
}