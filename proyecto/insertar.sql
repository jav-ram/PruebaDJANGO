--VENDEDORES
INSERT INTO vendedor VALUES('0','Cristobal',  'Enriquez', '1963-08-17');
INSERT INTO vendedor VALUES('1','Hugo',       'Mansilla', '1986-11-11');
INSERT INTO vendedor VALUES('2','Mercedes',   'Urrutia',  '1993-04-30');
INSERT INTO vendedor VALUES('3','Mariano',    'Matas',    '1956-04-15');
INSERT INTO vendedor VALUES('4','Rocio',      'Solana',   '1978-07-02');
INSERT INTO vendedor VALUES('5','Carolina',   'Pedrero',  '1991-06-25');
INSERT INTO vendedor VALUES('6','Jesus',      'Moratalla','1985-07-12');
INSERT INTO vendedor VALUES('7','Diego',      'Lopez',    '1985-10-24');
INSERT INTO vendedor VALUES('8','Jose',       'Vera',     '1984-11-21');
INSERT INTO vendedor VALUES('9','Juan',       'Lima',     '1985-09-30');

--CLIENTES
INSERT INTO cliente VALUES('0', 'Andres',     'Barrera',  '@nodejs',  '1989-04-01', '716753249', 'Guatemala', 'Guatemala', '714959250', 'Casado',   '88071821', 'anba@g.com', 'NULL');
INSERT INTO cliente VALUES('1', 'Francisco',  'Saenz',    '@nodejs',  '1977-03-06', '767572833', 'Mixco',     'Guatemala', '778892861', '',         '61519601', 'frsa@g.com', 'NULL');
INSERT INTO cliente VALUES('2', 'Maria',      'Gonzales', '@nodejs',  '1976-11-25', '470635737', 'Guatemala', 'Guatemala', '880718221', 'Soltero',  '74959250', 'mago@g.com', 'NULL');
INSERT INTO cliente VALUES('3', 'Ana',        'Cruz',     '@nodejs',  '1951-07-23', '715345876', 'Zona 16',   'Guatemala', '871134696', 'Casado',   '71495250', 'ancr@g.com', 'NULL');
INSERT INTO cliente VALUES('4', 'Irene',      'Santos',   '@nodejs',  '1963-02-25', '744177973', 'Mixco',     'Guatemala', '714959250', 'Casado',   '86757332', 'irsa@g.com', 'NULL');
INSERT INTO cliente VALUES('5', 'Catalina',   'Cabañas',  '@nodejs',  '1972-06-24', '383701396', 'Guatemala', 'Guatemala', '794480437', 'Soltero',  '68893794', 'ctcb@g.com', 'NULL');
INSERT INTO cliente VALUES('6', 'Juan',       'Maza',     '@nodejs',  '1955-05-19', '161952066', 'Guatemala', 'Guatemala', '688934794', 'Soltero',  '77889286', 'juma@g.com', 'NULL');
INSERT INTO cliente VALUES('7', 'Victor',     'Zuñiga',   '@nodejs',  '1984-03-06', '481765119', 'Guatemala', 'Guatemala', '745079224', 'Soltero',  '44080999', 'vizu@g.com', 'NULL');
INSERT INTO cliente VALUES('8', 'Agustin',    'Espada',   '@nodejs',  '1973-06-20', '439703526', 'Zona 16',   'Guatemala', '867570332', 'Casado',   '78892861', 'ages@g.com', 'NULL');
INSERT INTO cliente VALUES('9', 'Andrea',     'Paredes',  '@nodejs',  '1967-04-14', '433561782', 'Zona 16',   'Guatemala', '404080999', 'Soltero',  '81134696', 'anpa@g.com', 'NULL');

--EXTRAS
INSERT INTO extras VALUES('0', 'Boleto al circo',                 '350');
INSERT INTO extras VALUES('1', 'Entrada a parque de diversiones', '200');
INSERT INTO extras VALUES('2', 'Caminata turistica',              '125');
INSERT INTO extras VALUES('3', 'Museo de historia',               '75');
INSERT INTO extras VALUES('4', 'Galeria de arte',                 '200');
INSERT INTO extras VALUES('5', 'Zoologico',                       '100');
INSERT INTO extras VALUES('6', 'Hotel',                           '799');
INSERT INTO extras VALUES('7', 'Restaurante',                     '150');
INSERT INTO extras VALUES('8', 'Spa',                             '549');
INSERT INTO extras VALUES('9', 'Estadio',                         '299');

--VUELO
INSERT INTO vuelo VALUES('0', 'Guatemala',  'Francia',    'Avianca',  '56879', '2018-06-20', '2018-06-28', '3599');
INSERT INTO vuelo VALUES('1', 'Guatemala',  'Peru',       'Volaris',  '32145', '2018-07-04', '2018-07-18', '1899');
INSERT INTO vuelo VALUES('2', 'Guatemala',  'Alemania',   'Avianca',  '12359', '2018-06-11', '2018-06-25', '3499');
INSERT INTO vuelo VALUES('3', 'Guatemala',  'Colombia',   'TAG',      '75621', '2018-10-24', '2018-10-29', '1799');
INSERT INTO vuelo VALUES('4', 'Guatemala',  'Boston',     'TAG',      '32159', '2018-10-05', '2018-10-11', '2799');
INSERT INTO vuelo VALUES('5', 'Guatemala',  'Nueva York', 'TAG',      '15489', '2018-12-07', '2018-12-07', '3059');
INSERT INTO vuelo VALUES('6', 'Guatemala',  'Irlanda',    'Volaris',  '95432', '2018-10-12', '2018-10-26', '3399');
INSERT INTO vuelo VALUES('7', 'Guatemala',  'Tokio',      'Volaris',  '19745', '2018-08-01', '2018-08-20', '4699');
INSERT INTO vuelo VALUES('8', 'Guatemala',  'Madrid',     'Avianca',  '36458', '2018-05-17', '2018-05-23', '2999');
INSERT INTO vuelo VALUES('9', 'Guatemala',  'Mexico',     'Volaris',  '64555', '2018-10-17', '2018-10-27', '1299');

--PAQUETE
INSERT INTO paquete VALUES('0', '3');
INSERT INTO paquete VALUES('1', '5');
INSERT INTO paquete VALUES('2', '9');
INSERT INTO paquete VALUES('3', '0');
INSERT INTO paquete VALUES('4', '1');
INSERT INTO paquete VALUES('5', '8');
INSERT INTO paquete VALUES('6', '7');
INSERT INTO paquete VALUES('7', '2');
INSERT INTO paquete VALUES('8', '6');
INSERT INTO paquete VALUES('9', '4');

--Venta
INSERT INTO venta VALUES('0', '4', '3');
INSERT INTO venta VALUES('1', '8', '9');
INSERT INTO venta VALUES('2', '1', '1');
INSERT INTO venta VALUES('3', '3', '3');
INSERT INTO venta VALUES('4', '9', '3');
INSERT INTO venta VALUES('5', '4', '3');
INSERT INTO venta VALUES('6', '0', '9');
INSERT INTO venta VALUES('7', '1', '6');
INSERT INTO venta VALUES('8', '4', '5');
INSERT INTO venta VALUES('9', '3', '3');

--PaqueteExtras
INSERT INTO paqueteextras VALUES('3', '0');
INSERT INTO paqueteextras VALUES('2', '3');
INSERT INTO paqueteextras VALUES('8', '1');
INSERT INTO paqueteextras VALUES('3', '2');
INSERT INTO paqueteextras VALUES('2', '9');
INSERT INTO paqueteextras VALUES('3', '4');
INSERT INTO paqueteextras VALUES('3', '5');
INSERT INTO paqueteextras VALUES('5', '8');
INSERT INTO paqueteextras VALUES('3', '6');
INSERT INTO paqueteextras VALUES('3', '7');
