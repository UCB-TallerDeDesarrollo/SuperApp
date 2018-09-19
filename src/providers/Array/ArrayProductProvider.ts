import { Product } from "../../shared/models/Product.model";
import { ProductProvider } from "../../shared/providers/ProductProvider";
import { ArrayManager } from "../../Managers/ArrayManager";

const path_images = '../../assets/imgs/Products/'

export class ArrayProductProvider implements ProductProvider {
    public setLevel(level:number): void {
        if (level == undefined) {
                this.Continue();
        }
        else{
            this.level=level;
        }
        
    }
    private level:number;
    constructor()
    {
        this.level=1;
    }
    public nextLevel(): void {
        let maxLevel=this.getQuantityOfProducts()-1;
        (this.level>maxLevel)?this.level==maxLevel:this.level++;      
    }
    public getActualLevel(): number {
        return this.level;
    }
    
    static products: Product[] = [
        Product.createProduct(1, 'AJO', path_images+'ajo.jpg',1),
        Product.createProduct(2, 'CAFE', path_images+'cafe.jpg',2),
        Product.createProduct(3, 'COCA', path_images+'coca.jpg',3),
        Product.createProduct(4, 'LATA', path_images+'lata.jpg',4),
        Product.createProduct(5, 'MATE', path_images+'mate.jpg',5),
        Product.createProduct(6, 'PAN', path_images+'pan.jpg',6),
        Product.createProduct(7, 'PAPA', path_images+'papa.jpg',7),
        Product.createProduct(8, 'PALA', path_images+'pala.jpg',8),
        Product.createProduct(9, 'PERA', path_images+'pera.jpg',9),
        Product.createProduct(10, 'SAL', path_images+'sal.jpg',10),
        Product.createProduct(11, 'TE', path_images+'te.jpg',11),
        Product.createProduct(12, 'UVA', path_images+'uva.jpg',12),
        Product.createProduct(13, 'VASO', path_images+'vaso.jpg',13),
        Product.createProduct(14, 'PURE', path_images+'pure.jpg',14),
        Product.createProduct(15, 'SOPA', path_images+'sopa.jpg',15),
        Product.createProduct(16, 'ATUN', path_images+'atun.jpg',16),
        Product.createProduct(17, 'BALDE', path_images+'balde.jpg',17),
        Product.createProduct(18, 'PLATANO', path_images+'banana.jpg',18),
        Product.createProduct(19, 'CAMOTE', path_images+'batata.jpg',19),
        Product.createProduct(20, 'LECHE', path_images+'leche.jpg',20),
        Product.createProduct(21, 'LIMON', path_images+'limon.jpg',21),
        Product.createProduct(22, 'CARNE', path_images+'carne.jpg',22),
        Product.createProduct(23, 'CEREAL', path_images+'cereal.jpg',23),
        Product.createProduct(24, 'CHOCLO', path_images+'choclo.jpg',24),
        Product.createProduct(25, 'HUEVO', path_images+'huevo.jpg',25),
        Product.createProduct(26, 'JAMON', path_images+'jamon.jpg',26),
        Product.createProduct(27, 'JABON', path_images+'jabon.jpg',27),
        Product.createProduct(28, 'MELON', path_images+'melon.jpg',28),
        Product.createProduct(29, 'PATE', path_images+'pate.jpg',29),
        Product.createProduct(30, 'PALTA', path_images+'palta.jpg',30),
        Product.createProduct(31, 'ARROZ', path_images+'arroz.jpg',31),
        Product.createProduct(32, 'CEREZA', path_images+'cereza.jpg',32),
        Product.createProduct(33, 'ARVEJA', path_images+'arveja.jpg',33),
        Product.createProduct(34, 'POLLO', path_images+'pollo.jpg',34),
        Product.createProduct(35, 'PEPINO', path_images+'pepino.jpg',35),
        Product.createProduct(36, 'SANDIA', path_images+'sandia.jpg',36),
        Product.createProduct(37, 'TOMATE', path_images+'tomate.jpg',37),
        Product.createProduct(38, 'ACEITE', path_images+'aceite.jpg',38),
        Product.createProduct(39, 'ESCOBA', path_images+'escoba.jpg',39),
        Product.createProduct(40, 'HELADO', path_images+'helado.jpg',40),
        Product.createProduct(41, 'DURAZNO', path_images+'durazno.jpg',41),
        Product.createProduct(42, 'LAPIZ', path_images+'lapiz.jpg',42),
        Product.createProduct(43, 'PIMIENTO', path_images+'morron.jpg',43),
        Product.createProduct(44, 'NARANJA', path_images+'naranja.jpg',44),
        Product.createProduct(45, 'QUESO', path_images+'queso.jpg',45),
        Product.createProduct(46, 'AZUCAR', path_images+'azucar.jpg',46),
        Product.createProduct(47, 'PIZZA', path_images+'pizza.jpg',47),
        Product.createProduct(48, 'HONGOS', path_images+'hongos.jpg',48),
        Product.createProduct(49, 'ALFAJOR', path_images+'alfajor.jpg',49),
        Product.createProduct(50, 'CEBOLLA', path_images+'cebolla.jpg',50),
        Product.createProduct(51, 'FIDEOS', path_images+'fideos.jpg',51),
        Product.createProduct(52, 'ESPONJA', path_images+'esponja.jpg',52),
        Product.createProduct(53, 'PESCADO', path_images+'pescado.jpg',53),
        Product.createProduct(54, 'YERBA', path_images+'yerba.jpg',54),
        Product.createProduct(55, 'KIWI', path_images+'kiwi.jpg',55),
        Product.createProduct(56, 'LECHUGA', path_images+'lechuga.jpg',56),
        Product.createProduct(57, 'TOSTADA', path_images+'tostada.jpg',57),
        Product.createProduct(58, 'BROCOLI', path_images+'brocoli.jpg',58),
        Product.createProduct(59, 'MANZANA', path_images+'manzana.jpg',59),
        Product.createProduct(60, 'ZAPALLO', path_images+'zapallo.jpg',60),
    ];
    public getProductOfActualLevel():Product{
        if (this.level>60)
        {
         return ArrayManager.get_random_element(ArrayProductProvider.products);   
        }
        return ArrayProductProvider.products.find((x)=>x.Level==this.level);
    }
    public getQuantityOfProducts(): number {
        //return ArrayProductProvider.products.length;
        return 60;
    }
    private Continue()
    {
        return this.level=1;
    }
}
