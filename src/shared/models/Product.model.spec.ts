import { Product } from './product.model';

describe("Test Product model", function() {
    let emptyProduct: Product;
    let notEmptyProduct: Product;

    beforeEach(function() {
        emptyProduct = new Product();
        notEmptyProduct = Product.createProduct(1, 'title1', 'image1', 1);
    });

    afterEach(function() {
        emptyProduct = null;
        notEmptyProduct = null;
    });

    it('must return -1 as id', function() {
        expect(emptyProduct.Id).toBe(-1);
    });

    it('must return empty as title', function() {
        expect(emptyProduct.Title).toBe('');
    });

    it('must return empty as image', function() {
        expect(emptyProduct.ImageURL).toBe('');
    });

    it('must return 0 as level', function() {
        expect(emptyProduct.Level).toBe(0);
    });

    it('must return 1 as id', function() {
        expect(notEmptyProduct.Id).toBe(1);
    });

    it('must return title1 as title', function() {
        expect(notEmptyProduct.Title).toBe('title1');
    });
});
