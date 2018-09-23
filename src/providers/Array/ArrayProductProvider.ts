import { Product } from "../../shared/models/product.model";
import { ProductProvider } from "../../shared/providers/ProductProvider";
import { ArrayManager } from "../../Managers/ArrayManager";

export class ArrayProductProvider implements ProductProvider {
    
    private static readonly PATH_IMAGES: string = '../../assets/imgs/Products/';
    private level: number;

    constructor() {
        this.level = 1;
    }

    public setLevel(level: number): void {
        if (level == undefined) {
            this.Continue();
        }
        else{
            this.level=level;
        }
    }
    
    public nextLevel(): void {
        this.level++;
    }

    public getActualLevel(): number {
        return this.level;
    }
    
    public getProductOfActualLevel(): Product{
        if (this.level>60) {
            return ArrayManager.get_random_element(ArrayProductProvider.products);   
        }
        return ArrayProductProvider.products.find((x)=>x.Level==this.level);
    }

    public getQuantityOfProducts(): number {
        return ArrayProductProvider.products.length;
    }

    private Continue() {
        return this.level = 1;
    }
    
    private static readonly products: Product[] = [
        Product.createProduct(1, 'AJO', ArrayProductProvider.PATH_IMAGES+'ajo.jpg',1),
        Product.createProduct(2, 'CAFE', ArrayProductProvider.PATH_IMAGES+'cafe.jpg',2),
        Product.createProduct(3, 'COCA', ArrayProductProvider.PATH_IMAGES+'coca.jpg',3),
        Product.createProduct(4, 'LATA', ArrayProductProvider.PATH_IMAGES+'lata.jpg',4),
        Product.createProduct(5, 'MATE', ArrayProductProvider.PATH_IMAGES+'mate.jpg',5),
        Product.createProduct(6, 'PAN', ArrayProductProvider.PATH_IMAGES+'pan.jpg',6),
        Product.createProduct(7, 'PAPA', ArrayProductProvider.PATH_IMAGES+'papa.jpg',7),
        Product.createProduct(8, 'PALA', ArrayProductProvider.PATH_IMAGES+'pala.jpg',8),
        Product.createProduct(9, 'PERA', ArrayProductProvider.PATH_IMAGES+'pera.jpg',9),
        Product.createProduct(10, 'SAL', ArrayProductProvider.PATH_IMAGES+'sal.jpg',10),
        Product.createProduct(11, 'TE', ArrayProductProvider.PATH_IMAGES+'te.jpg',11),
        Product.createProduct(12, 'UVA', ArrayProductProvider.PATH_IMAGES+'uva.jpg',12),
        Product.createProduct(13, 'VASO', ArrayProductProvider.PATH_IMAGES+'vaso.jpg',13),
        Product.createProduct(14, 'PURE', ArrayProductProvider.PATH_IMAGES+'pure.jpg',14),
        Product.createProduct(15, 'SOPA', ArrayProductProvider.PATH_IMAGES+'sopa.jpg',15),
        Product.createProduct(16, 'ATUN', ArrayProductProvider.PATH_IMAGES+'atun.jpg',16),
        Product.createProduct(17, 'BALDE', ArrayProductProvider.PATH_IMAGES+'balde.jpg',17),
        Product.createProduct(18, 'PLATANO', ArrayProductProvider.PATH_IMAGES+'banana.jpg',18),
        Product.createProduct(19, 'CAMOTE', ArrayProductProvider.PATH_IMAGES+'batata.jpg',19),
        Product.createProduct(20, 'LECHE', ArrayProductProvider.PATH_IMAGES+'leche.jpg',20),
        Product.createProduct(21, 'LIMON', ArrayProductProvider.PATH_IMAGES+'limon.jpg',21),
        Product.createProduct(22, 'CARNE', ArrayProductProvider.PATH_IMAGES+'carne.jpg',22),
        Product.createProduct(23, 'CEREAL', ArrayProductProvider.PATH_IMAGES+'cereal.jpg',23),
        Product.createProduct(24, 'CHOCLO', ArrayProductProvider.PATH_IMAGES+'choclo.jpg',24),
        Product.createProduct(25, 'HUEVO', ArrayProductProvider.PATH_IMAGES+'huevo.jpg',25),
        Product.createProduct(26, 'JAMON', ArrayProductProvider.PATH_IMAGES+'jamon.jpg',26),
        Product.createProduct(27, 'JABON', ArrayProductProvider.PATH_IMAGES+'jabon.jpg',27),
        Product.createProduct(28, 'MELON', ArrayProductProvider.PATH_IMAGES+'melon.jpg',28),
        Product.createProduct(29, 'PATE', ArrayProductProvider.PATH_IMAGES+'pate.jpg',29),
        Product.createProduct(30, 'PALTA', ArrayProductProvider.PATH_IMAGES+'palta.jpg',30),
        Product.createProduct(31, 'ARROZ', ArrayProductProvider.PATH_IMAGES+'arroz.jpg',31),
        Product.createProduct(32, 'CEREZA', ArrayProductProvider.PATH_IMAGES+'cereza.jpg',32),
        Product.createProduct(33, 'ARVEJA', ArrayProductProvider.PATH_IMAGES+'arveja.jpg',33),
        Product.createProduct(34, 'POLLO', ArrayProductProvider.PATH_IMAGES+'pollo.jpg',34),
        Product.createProduct(35, 'PEPINO', ArrayProductProvider.PATH_IMAGES+'pepino.jpg',35),
        Product.createProduct(36, 'SANDIA', ArrayProductProvider.PATH_IMAGES+'sandia.jpg',36),
        Product.createProduct(37, 'TOMATE', ArrayProductProvider.PATH_IMAGES+'tomate.jpg',37),
        Product.createProduct(38, 'ACEITE', ArrayProductProvider.PATH_IMAGES+'aceite.jpg',38),
        Product.createProduct(39, 'ESCOBA', ArrayProductProvider.PATH_IMAGES+'escoba.jpg',39),
        Product.createProduct(40, 'HELADO', ArrayProductProvider.PATH_IMAGES+'helado.jpg',40),
        Product.createProduct(41, 'DURAZNO', ArrayProductProvider.PATH_IMAGES+'durazno.jpg',41),
        Product.createProduct(42, 'LAPIZ', ArrayProductProvider.PATH_IMAGES+'lapiz.jpg',42),
        Product.createProduct(43, 'PIMIENTO', ArrayProductProvider.PATH_IMAGES+'morron.jpg',43),
        Product.createProduct(44, 'NARANJA', ArrayProductProvider.PATH_IMAGES+'naranja.jpg',44),
        Product.createProduct(45, 'QUESO', ArrayProductProvider.PATH_IMAGES+'queso.jpg',45),
        Product.createProduct(46, 'AZUCAR', ArrayProductProvider.PATH_IMAGES+'azucar.jpg',46),
        Product.createProduct(47, 'PIZZA', ArrayProductProvider.PATH_IMAGES+'pizza.jpg',47),
        Product.createProduct(48, 'HONGOS', ArrayProductProvider.PATH_IMAGES+'hongos.jpg',48),
        Product.createProduct(49, 'ALFAJOR', ArrayProductProvider.PATH_IMAGES+'alfajor.jpg',49),
        Product.createProduct(50, 'CEBOLLA', ArrayProductProvider.PATH_IMAGES+'cebolla.jpg',50),
        Product.createProduct(51, 'FIDEOS', ArrayProductProvider.PATH_IMAGES+'fideos.jpg',51),
        Product.createProduct(52, 'ESPONJA', ArrayProductProvider.PATH_IMAGES+'esponja.jpg',52),
        Product.createProduct(53, 'PESCADO', ArrayProductProvider.PATH_IMAGES+'pescado.jpg',53),
        Product.createProduct(54, 'YERBA', ArrayProductProvider.PATH_IMAGES+'yerba.jpg',54),
        Product.createProduct(55, 'KIWI', ArrayProductProvider.PATH_IMAGES+'kiwi.jpg',55),
        Product.createProduct(56, 'LECHUGA', ArrayProductProvider.PATH_IMAGES+'lechuga.jpg',56),
        Product.createProduct(57, 'TOSTADA', ArrayProductProvider.PATH_IMAGES+'tostada.jpg',57),
        Product.createProduct(58, 'BROCOLI', ArrayProductProvider.PATH_IMAGES+'brocoli.jpg',58),
        Product.createProduct(59, 'MANZANA', ArrayProductProvider.PATH_IMAGES+'manzana.jpg',59),
        Product.createProduct(60, 'ZAPALLO', ArrayProductProvider.PATH_IMAGES+'zapallo.jpg',60),
    ];
}
