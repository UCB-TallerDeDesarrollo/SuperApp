let path_images = '../../assets/imgs/Products/'

export class DataBaseService{
    static products: Array<{name: string, image: string}> = [
        {name: 'ARROZ', image: path_images+'arroz.jpg'},
        {name: 'ATUN', image: path_images+'atun.jpg'},
        {name: 'AZUCAR', image: path_images+'azucar.jpg'},
        {name: 'BANANA', image: path_images+'banana.jpg'},
        {name: 'CARNE', image: path_images+'carne.jpg'},
        {name: 'CAFE', image: path_images+'cafe.jpg'}
    ];

    static getProducts(){
        return this.products;
    }
}