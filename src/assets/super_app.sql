
CREATE TABLE IF NOT EXISTS category(
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT);

CREATE TABLE IF NOT EXISTS product(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    image TEXT,
    state INTEGER,
    on_list INTEGER,
    audio TEXT,
    category_id INTEGER,
    FOREIGN KEY(category_id) REFERENCES category(category_id));

INSERT INTO category(title) VALUES('ALMACEN');
INSERT INTO category(title) VALUES('VERDULERIA');
INSERT INTO category(title) VALUES('FRESCOS');
INSERT INTO category(title) VALUES('OTROS');

INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('ARROZ','/imgs/Products/arroz.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('ARVEJA','/imgs/Products/arveja.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('ATUN','/imgs/Products/atun.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('AZUCAR','/imgs/Products/azucar.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('BALDE','/imgs/Products/balde.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('BANANA','/imgs/Products/banana.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('BATATA','/imgs/Products/batata.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('BERENJENA','/imgs/Products/berenjena.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('BROCOLI','/imgs/Products/brocoli.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('CAFE','/imgs/Products/cafe.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('CARNE','/imgs/Products/carne.jpg', 1, 1, "", 3);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('CEBOLLA','/imgs/Products/cebolla.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('CEREAL','/imgs/Products/cereal.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('CEREZA','/imgs/Products/cereza.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('CHOCLO','/imgs/Products/choclo.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('COCA','/imgs/Products/coca.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('DURAZNO','/imgs/Products/durazno.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('ESPONJA','/imgs/Products/esponja.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('FIDEOS','/imgs/Products/fideos.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('GLOBOS','/imgs/Products/globos.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('HELADO','/imgs/Products/helado.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('HONGOS','/imgs/Products/hongos.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('HUEVOS','/imgs/Products/huevo.jpg', 1, 1, "", 3);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('JABON','/imgs/Products/jabon.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('JAMON','/imgs/Products/jamon.jpg', 1, 1, "", 3);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('KIWI','/imgs/Products/kiwi.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('LAPIZ','/imgs/Products/lapiz.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('LATA','/imgs/Products/lata.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('LECHE','/imgs/Products/leche.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('LECHUGA','/imgs/Products/lechuga.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('LIMON','/imgs/Products/limon.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('MANZANA','/imgs/Products/manzana.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('MATE','/imgs/Products/mate.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('MELON','/imgs/Products/melon.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('MORRON','/imgs/Products/morron.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('NARANJA','/imgs/Products/naranja.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PALA','/imgs/Products/pala.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PALTA','/imgs/Products/palta.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PAN','/imgs/Products/pan.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PAPA','/imgs/Products/papa.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PATE','/imgs/Products/pate.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PEPINO','/imgs/Products/pepino.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PERA','/imgs/Products/pera.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PESCADO','/imgs/Products/pescado.jpg', 1, 1, "", 3);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PIZZA','/imgs/Products/pizza.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('POLLO','/imgs/Products/pollo.jpg', 1, 1, "", 3);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('PURE','/imgs/Products/pure.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('QUESO','/imgs/Products/queso.jpg', 1, 1, "", 3);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('SAL','/imgs/Products/sal.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('SANDIA','/imgs/Products/sandia.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('SOPA','/imgs/Products/sopa.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('TE','/imgs/Products/te.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('TOMATE','/imgs/Products/tomate.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('TOSTADA','/imgs/Products/tostada.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('UVA','/imgs/Products/uva.jpg', 1, 1, "", 2);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('VASO','/imgs/Products/vaso.jpg', 1, 1, "", 4);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('YERBA','/imgs/Products/yerba.jpg', 1, 1, "", 1);
INSERT INTO product(title, image, state, on_list, audio, category_id) VALUES('ZAPALLO','/imgs/Products/zapallo.jpg', 1, 1, "", 2);

/*export PATH=$PATH:/opt/gradle/gradle-4.1/bin
./sdkmanager "build-tools;26.1.1"*/