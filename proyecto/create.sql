drop table if exists Cliente;
drop table if exists Venta;
drop table if exists Vendedor;
drop table if exists Extras;
drop table if exists Paquete;
drop table if exists Vuelo;

create table Cliente(
	clienteId integer not null,
	nombre varchar(15),
	apellido varchar (15),
	f_nacimiento date,
	pasaporte integer,
	direccion varchar(40),
	pais varchar(20),
	dpi integer,
	estado_civil varchar(10),
	telefono integer,
	correo_electronico varchar(30),
	foto varchar(100),
	PRIMARY KEY (clienteId)
);

create table Vendedor(
	vendedorId integer not null,
	nombre varchar(15),
	apellido varchar(15),
	f_nacimiento date,
	PRIMARY KEY (vendedorId)
);

create table Extras(
	extraId integer not null,
	nombre varchar(15),
	precio integer,
	PRIMARY KEY (extraId)
);

create table Vuelo (
	vueloId int,
	origen varchar(25),
	destino varchar(25),
	aereolinea varchar(25),
	n_avion varchar(15),
	f_salida date,
	f_arribo date,
	precio integer,
	PRIMARY KEY (vueloId)
);

create table Paquete(
	precio integer,
	vueloId integer,
	paqueteId integer,
	FOREIGN KEY (vueloId) REFERENCES Vuelo(vueloId),
	PRIMARY KEY (paqueteId)
);

create table Venta(
	clienteId integer,
	vendedorId integer,
	paqueteId integer,
	FOREIGN KEY (clienteId) REFERENCES Cliente(clienteId),
	FOREIGN KEY (vendedorId) REFERENCES Vendedor(vendedorId),
	FOREIGN KEY (paqueteId) REFERENCES Paquete(paqueteId)
);
