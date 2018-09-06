let path_images = '../../assets/imgs/Products/'

export class FakeProducts{
  
    static products: Array<{id: number, title: string, image: string}>= [
        {id: 1, title: 'ARROZ', image: path_images+'arroz.jpg'},
        {id: 2, title: 'ATUN', image: path_images+'atun.jpg'},
        {id: 3, title: 'AZUCAR', image: path_images+'azucar.jpg'},
        {id: 4, title: 'BANANA', image: path_images+'banana.jpg'},
        {id: 5, title: 'CARNE', image: path_images+'carne.jpg'},
        {id: 6, title: 'CAFE', image: path_images+'cafe.jpg'},
        {id: 7, title: 'ARVEJA', image: path_images+'arveja.jpg'},
        {id: 8, title: 'BROCOLI', image: path_images+'brocoli.jpg'},
        {id: 9, title: 'BATATA', image: path_images+'batata.jpg'},
        {id: 10, title: 'CEBOLLA', image: path_images+'cebolla.jpg'},
        {id: 11, title: 'CEREAL', image: path_images+'cereal.jpg'},
        {id: 12, title: 'COCA', image: path_images+'coca.jpg'}
    ];

    static getProducts(){
        return this.products;
    }

    static getProductById(id: number){
        return this.products[id];
    }
    static get_random_product(): any {
    
    }
}