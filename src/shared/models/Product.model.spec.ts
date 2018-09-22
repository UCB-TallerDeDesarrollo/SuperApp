import { Product } from './product.model';

describe("Test Product model", function() {
    let product: Product;

    beforeEach(function() {
        product = new Product();
    });

    afterEach(function() {
        product = null;
    });

    it('must return -1 as id', function() {
        expect(product.Id).toBe(-1);
    });
});
