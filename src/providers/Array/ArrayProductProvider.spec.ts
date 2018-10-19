import { Product } from './../../shared/models/Product.model';
import { ArrayProductProvider } from './ArrayProductProvider';

describe("Test ArrayProductProvider static functions", function() {

    let arrayProductProvider: ArrayProductProvider;
    const path_images = '../../assets/imgs/Products/';

    beforeEach(function() {
        arrayProductProvider = new ArrayProductProvider();
    });

    it("must return quantity of products", function() {
        expect(arrayProductProvider.getQuantityOfProducts()).toBe(60)
    });

    it("must return the correspondent product", function() {
        let product: Product;
        product = Product.createProduct(1, 'AJO', path_images+'ajo.jpg',1);
        expect(arrayProductProvider.getProductOfActualLevel(1)).toEqual(product)
    });

    it("must return the correspondent product in level 61", function() {
        let product: Product;
        expect(ArrayProductProvider.products).toContain(arrayProductProvider.getProductOfActualLevel(61));
    });

});
