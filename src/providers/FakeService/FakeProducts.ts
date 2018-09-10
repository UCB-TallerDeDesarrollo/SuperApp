import { ArrayManager } from "../../Managers/ArrayManager";
import { Product } from "../../shared/models/product.model";

const path_images = '../../assets/imgs/Products/'

export class FakeProducts {
  
    static products: Array<Product> = [
        Product.createProduct(1, 'ARROZ', path_images+'arroz.jpg'),
        Product.createProduct(2, 'ATUN', path_images+'atun.jpg'),
        Product.createProduct(3, 'AZUCAR', path_images+'azucar.jpg'),
        Product.createProduct(4, 'BANANA', path_images+'banana.jpg'),
        Product.createProduct(5, 'CARNE', path_images+'carne.jpg'),
        Product.createProduct(6, 'CAFE', path_images+'cafe.jpg'),
        Product.createProduct(7, 'ARVEJA', path_images+'arveja.jpg'),
        Product.createProduct(8, 'BROCOLI', path_images+'brocoli.jpg'),
        Product.createProduct(9, 'BATATA', path_images+'batata.jpg'),
        Product.createProduct(10, 'CEBOLLA', path_images+'cebolla.jpg'),
        Product.createProduct(11, 'CEREAL', path_images+'cereal.jpg'),
        Product.createProduct(12, 'COCA', path_images+'coca.jpg')
    ];

    public static getProducts(): Array<Product> {
        return this.products;
    }

    public static getProductById(id: number): Product {
        return this.products[id];
    }

    public static get_random_product(): Product {
        return ArrayManager.get_random_element(this.products);
    }

}
