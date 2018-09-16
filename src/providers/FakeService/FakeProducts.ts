import { ArrayManager } from "../../Managers/ArrayManager";

let path_images = '../../assets/imgs/Products/'

export class FakeProducts{
  
    static products: Array<{id: number, title: string, image: string, categoryId: number}>= [
        {id: 1, title: 'ARROZ', image: path_images+'arroz.jpg',categoryId: 1},
        {id: 2, title: 'ARVEJA', image: path_images+'arveja.jpg',categoryId: 2},
        {id: 3, title: 'ATUN', image: path_images+'atun.jpg',categoryId: 1},
        {id: 4, title: 'AZUCAR', image: path_images+'azucar.jpg',categoryId: 1},
        {id: 5, title: 'BALDE', image: path_images+'balde.jpg',categoryId: 4},
        {id: 6, title: 'BANANA', image: path_images+'banana.jpg',categoryId: 2},
        {id: 7, title: 'BATATA', image: path_images+'batata.jpg',categoryId: 2},
        {id: 8, title: 'BERENJENA', image: path_images+'berenjena.jpg',categoryId: 2},
        {id: 9, title: 'BROCOLI', image: path_images+'brocoli.jpg',categoryId: 2},
        {id: 10, title: 'CAFE', image: path_images+'cafe.jpg',categoryId: 1},
        {id: 11, title: 'CARNE', image: path_images+'carne.jpg',categoryId: 3},
        {id: 12, title: 'CEBOLLA', image: path_images+'cebolla.jpg',categoryId: 2},
        {id: 13, title: 'CEREAL', image: path_images+'cereal.jpg',categoryId: 1},
        {id: 14, title: 'CEREZA', image: path_images+'cereza.jpg',categoryId: 2},
        {id: 15, title: 'CHOCLO', image: path_images+'choclo.jpg',categoryId: 2},
        {id: 16, title: 'COCA', image: path_images+'coca.jpg',categoryId: 1},
        {id: 17, title: 'DURAZNO', image: path_images+'durazno.jpg',categoryId: 2},
        {id: 18, title: 'ESPONJA', image: path_images+'esponja.jpg',categoryId: 4},
        {id: 19, title: 'FIDEOS', image: path_images+'fideos.jpg',categoryId: 1},
        {id: 20, title: 'GLOBOS', image: path_images+'globos.jpg',categoryId: 4},
        {id: 21, title: 'HELADO', image: path_images+'helado.jpg',categoryId: 1},
        {id: 22, title: 'HONGOS', image: path_images+'hongos.jpg',categoryId: 2},
        {id: 23, title: 'HUEVOS', image: path_images+'huevo.jpg',categoryId: 3},
        {id: 24, title: 'JABON', image: path_images+'jabon.jpg',categoryId: 4},
        {id: 25, title: 'JAMON', image: path_images+'jamon.jpg',categoryId: 3},
        {id: 26, title: 'KIWI', image: path_images+'kiwi.jpg',categoryId: 2},
        {id: 27,  title: 'LAPIZ', image: path_images+'lapiz.jpg',categoryId: 4},
        {id: 28, title: 'LATA', image: path_images+'lata.jpg',categoryId: 4},
        {id: 29, title: 'LECHE', image: path_images+'leche.jpg',categoryId: 1},
        {id: 30, title: 'LECHUGA', image: path_images+'lechuga.jpg',categoryId: 2},
        {id: 31, title: 'LIMON', image: path_images+'limon.jpg',categoryId: 2},
        {id: 32, title: 'MANZANA', image: path_images+'manzana.jpg',categoryId: 2},
        {id: 33, title: 'MATE', image: path_images+'mate.jpg',categoryId: 1},
        {id: 34, title: 'MELON', image: path_images+'melon.jpg',categoryId: 2},
        {id: 35, title: 'MORRON', image: path_images+'morron.jpg',categoryId: 2},
        {id: 36, title: 'NARANJA', image: path_images+'naranja.jpg',categoryId: 2},
        {id: 37, title: 'PALA', image: path_images+'pala.jpg',categoryId: 4},
        {id: 38, title: 'PALTA', image: path_images+'palta.jpg',categoryId: 2},
        {id: 39, title: 'PAN', image: path_images+'pan.jpg',categoryId: 1},
        {id: 40, title: 'PAPA', image: path_images+'papa.jpg',categoryId: 2},
        {id: 41, title: 'PATE', image: path_images+'pate.jpg',categoryId: 1},
        {id: 42, title: 'PEPINO', image: path_images+'pepino.jpg',categoryId: 2},
        {id: 43, title: 'PERA', image: path_images+'pera.jpg',categoryId: 2},
        {id: 44, title: 'PESCADO', image: path_images+'pescado.jpg',categoryId: 3},
        {id: 45, title: 'PIZZA', image: path_images+'pizza.jpg',categoryId: 1},
        {id: 46, title: 'POLLO', image: path_images+'pollo.jpg',categoryId: 3},
        {id: 47, title: 'PURE', image: path_images+'pure.jpg',categoryId: 1},
        {id: 48, title: 'QUESO', image: path_images+'queso.jpg',categoryId: 3},
        {id: 49, title: 'SAL', image: path_images+'sal.jpg',categoryId: 1},
        {id: 50, title: 'SANDIA', image: path_images+'sandia.jpg',categoryId: 2},
        {id: 51, title: 'SOPA', image: path_images+'sopa.jpg',categoryId: 4},
        {id: 52, title: 'TE', image: path_images+'te.jpg',categoryId: 1},
        {id: 53, title: 'TOMATE', image: path_images+'tomate.jpg',categoryId: 2},
        {id: 54, title: 'TOSTADA', image: path_images+'tostada.jpg',categoryId: 4},
        {id: 55, title: 'UVA', image: path_images+'uva.jpg',categoryId: 2},
        {id: 56, title: 'VASO', image: path_images+'vaso.jpg',categoryId: 4},
        {id: 57, title: 'YERBA', image: path_images+'yerba.jpg',categoryId: 1},
        {id: 58, title: 'ZAPALLO', image: path_images+'zapallo.jpg',categoryId: 2}
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