drop table if exists Cliente;
drop table if exists Venta;
drop table if exists Vendedor;
drop table if exists Extras;
drop table if exists Paquete;
drop table if exists Vuelo;

create table Cliente(
	id integer not null,
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
	foto string,
	PRIMARY KEY (id)
);

create table Vendedor(
	id integer not null,
	nombre varchar(15),
	apellido varchar(15),
	f_nacimiento date,
	PRIMARY KEY (id)
);

create table Extras(
	id integer not null,
	nombre varchar(15),
	precio integer,
	PRIMARY KEY (id)
);

create table Vuelo (
	origen varchar(25),
	destino varchar(25),
	aereolinea varchar(25),
	n_avion varchar(15),
	f_salida date,
	f_arribo date,
	precio integer
);

create table Venta(
	id_cliente integer,
	id_vendedor integer,
	FOREIGN KEY (id_cliente) REFERENCES Cliente(id),
	FOREIGN KEY (id_vendedor) REFERENCES Vendedor(id)
);

create table Paquete(
	precio integer,
	vuelo ?????
);