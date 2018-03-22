let query = 'SELECT '
if (r.key[0] == /*valor */) {
  query += 'vendedorid '
  if(r.key[1] == /*valor */ | r.key[2] == /*valor */ | r.key[3] == /*valor */){
    query += ', '
  }
}
if (r.key[1] == /*valor */){
  query += 'nombre '
  if(r.key[2] == /*valor */ | r.key[3] == /*valor */){
    query += ', '
  }
}
if (r.key[2] == /*valor */){
  query += 'apellido '
  if(r.key[3] == /*valor */){
    query += ', '
  }
}
if (r.key[3] == /*valor */){
  query += 'f_nacimiento '
}
query += 'from Vendedor ORDER BY DESC'

console.log(query);



try {
		Object.keys(r).forEach(function(key)
	{
		console.log(key + ': '+ r[key]);
		console.log(r[key]);


	});
}
catch (err) {
	console.log("WELP");
}






app.get('/vendedorInsert', function(req, resp, next) {
	//let response = 'SELECT * FROM Vendedor LIMIT 1';
	let response = "select column_name from INFORMATION_SCHEMA.COLUMNS where table_name = '" + req.query.tabla + "';";
	let jsResponse = [];
	let a = '';
	client.query(response, (err, res) => {
		if (err) {
			console.log(err.stack);
			resp.send('ERROR, QUERY')
		} else {
			let rw = res.rows;
			for (let i = 0; i < rw.length; i++){
				jsResponse.push(rw[i].column_name);
			}

			console.log(jsResponse, rw.length);
			resp.render('vendedorInsert', { elementos: jsResponse, tabla: req.query.tabla});
		}
	})
	/*
	client.query(response, (err, res) => {
		if (err) {
			console.log(err.stack);
			resp.send('ERROR, QUERY')
		} else {
			jsResponse = res.rows;
			console.log(jsResponse[0]);
			resp.render('vendedorInsert', { elementos: jsResponse});
		}
	});*/

});




	try{
		if (r.id == 'on') {
			qry += 'vendedorid '
			if(r[key[1]] == 'on'| r.apellido == 'on'| r.f_nacimiento == 'on'){
		    qry += ', '
		  }
		}
		if (r.nombre == 'on'){
		  qry += 'nombre '
		  if(r.apellido == 'on' | r.f_nacimiento == 'on'){
		    qry += ', '
		  }
		}
		if (r.apellido == 'on'){
		  qry += 'apellido '
		  if(r.f_nacimiento == 'on'){
		    qry += ', '
		  }
		}
		if (r.f_nacimiento == 'on'){
		  qry += 'f_nacimiento '
		}
	}
	catch(err){
		console.log("nope");
	}
  h1 Cliente form(action="/vendedorInsert", method="get") input(type="hidden", name="tabla", value='cliente') input#tabla(type="submit", value="Ingresar cliente") br form(action="/showVendedor", method="get") input(type="hidden", name="tabla", value="cliente") input#tabla(type="submit", value="Mostrar clientes") h1 Vuelo form(action="/vendedorInsert", method="get") input(type="hidden", name="tabla", value='vuelo') input#tabla(type="submit", value="Ingresar vuelo") br form(action="/showVendedor", method="get") input(type="hidden", name="tabla", value="vuelo") input#tabla(type="submit", value="Mostrar vuelos")
