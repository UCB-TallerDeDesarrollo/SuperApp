import { SortWordGame } from './sortWordGame.model';
import { Product } from './product.model';

describe("Test SortWordGame model", function() {
    let product: Product;
    let sortWordGame: SortWordGame;

    beforeEach(function() {
        product = Product.createProduct(1, 'title1', 'image1', 2);
        sortWordGame = new SortWordGame(product);
    });

    afterEach(function() {
        product = null;
        sortWordGame = null;
    });

    it('must return false because is not game over', function() {
        expect(sortWordGame.isGameOver()).toBe(false);
    });
});
