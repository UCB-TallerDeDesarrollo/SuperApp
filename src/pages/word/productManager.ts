export class ProductManager{
    static products:string[]=["arroz", "atun", "azucar", "cafe"];
    static get_product(){
        var index=this.randomInt(0, this.products.length);
        return this.products[index];
    }
    static randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }
}