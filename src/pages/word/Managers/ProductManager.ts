import { ArrayManager } from './ArrayManager';

export class ProductManager{

    static products:string[]=["ARROZ","ATUN","AZUCAR","CAFE","LIMON","CARNE"];

    static get_product(){
        return ArrayManager.get_random_element(this.products);
    }
  
}