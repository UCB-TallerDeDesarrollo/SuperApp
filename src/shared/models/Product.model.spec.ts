import { Product } from './product.model';

describe("Test Product model", function() {
    let emptyProduct: Product;

    beforeEach(function() {
        emptyProduct = new Product();
    });

    afterEach(function() {
        emptyProduct = null;
    });

    it('must return -1 as id', function() {
        expect(emptyProduct.Id).toBe(-1);
    });
});
