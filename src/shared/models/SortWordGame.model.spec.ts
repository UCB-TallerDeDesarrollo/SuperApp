import { SortWordGame } from './sortWordGame.model';
import { Product } from './product.model';
import { ColorProvider } from '../providers/ColorProvider';
import { ArrayColorProvider } from '../../providers/Array/ArrayColorProvider';

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

    it('must return true because is game over', function() {
        sortWordGame.addCount();
        sortWordGame.addCount();
        sortWordGame.addCount();
        sortWordGame.addCount();
        sortWordGame.addCount();
        sortWordGame.addCount();

        expect(sortWordGame.isGameOver()).toBe(true);
    });

    it('must return the product that was used in constructor', function() {
        expect(sortWordGame.Product).toBe(product);
    });

    it('must return the title of product', function() {
        expect(sortWordGame.ResponseWord).toBe(product.Title);
    });

    it('must return messy letters of response word', function() {
        let colorProvider: ColorProvider;
        colorProvider = new ArrayColorProvider();

        let response: any = [];
        for (let letter of sortWordGame.ResponseWord) {
            response[letter] = colorProvider.getRandomColor();
        }
        
        sortWordGame.buildLetters(response);

        expect(sortWordGame.MessyWord).not.toBe(sortWordGame.SortedWord);
    });
});
