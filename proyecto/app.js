let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let pg = require('pg');

let index = require('./routes/index');
let users = require('./routes/users');
let request = require('./routes/request');

//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
//let conString = "postgres://postgres:j66352769@localhost:5432/turismo";
let conString = "postgres://postgres:admin@localhost:5432/turismo";

var client = new pg.Client(conString);
client.connect();

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// GET response page from query
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

//Insert de Vendedor
app.get('/datoIngresadoVendedor', function(req, resp, next) {
	let response = ''+req;
	let param = req.query;
	let columns = Object.keys(req.query);
	let query = "INSERT INTO " + param.tabla + "(";
	//Para no agarrar el nombre de la tabla como atributo
	for (let i  = 0; i < columns.length - 1; i++){
		query += columns[i] +",";
	}
	query = query.slice(0, -1);	//Borramos la ultima coma
	query += ") VALUES ("
	for (let i  = 0; i < columns.length - 1; i++){
		query += "'" + param[columns[i]] + "'" +",";
	}
	query = query.slice(0, -1);	//Borramos la ultima coma
	query += ");"
	console.log(query);
	/*
	console.log(req.query);
	atributos.push(req.query.vendedorid);
	atributos.push(req.query.nombre);
	atributos.push(req.query.apellido);
	atributos.push(req.query.f_nacimiento);
	console.log(atributos);
	*/
	let jsResponse = [];
	let a = '';
	/*let q = "INSERT INTO Vendedor (vendedorid, nombre, apellido, f_nacimiento)";
	q += " VALUES ('" + atributos[0] + "','" + atributos[1] + "','" + atributos[2] + "','" + atributos[3] +"'";
	q += ");";*/
	//let p = "INSERT INTO Vendedor (vendedorid, nombre, apellido, f_nacimiento) VALUES (3, 'Gabriel', 'Gonzales', '1998-09-08')";
	//console.log(q, p);
	client.query(query, (err, res) => {
		if (err) {
			console.log(err.stack);
			resp.send('ERROR, QUERY')
		} else {
			jsResponse = res.rows;
			console.log(jsResponse[0]);
			resp.send('Si se pudo!');
			//resp.render('vendedorInsert', { elementos: jsResponse[0]});
		}
	});

});



//Eliminar
app.get('/eliminarVendedor', function(req, resp, next) {
	let obj = req.query;
	let key = Object.keys(obj)[0];
	console.log(key);

  let q = "DELETE FROM Vendedor WHERE "+key+" =" + obj.vendedorid;

  //let p = "INSERT INTO Vendedor (vendedorid, nombre, apellido, f_nacimiento) VALUES (3, 'Gabriel', 'Gonzales', '1998-09-08')";
  //console.log(q, p);

  client.query(q, (err, res) => {
    if (err) {
      console.log(err.stack);
      resp.send('ERROR, QUERY')
    } else {
      resp.send('Si se pudo eliminar vendedor' + req.query.id + '!');
      //resp.render('vendedorInsert', { elementos: jsResponse[0]});
    }
  });

});



app.get('/showVendedor',function(req, resp, next){
	let r = req.query
	let key = Object.keys(r)[0];
	let qry = 'SELECT '
	//let key = Object.keys(obj);
	//console.log(key[0]);
/*
	try {
		let key = Object.keys(obj);
	}
	catch(err){
		console.log("Es nulo");
	}
	*/
/*
	try {
		console.log(key[0]);
	}
	catch(err){
		console.log("es la implementacion base");
	}
*/

	try{
		if (r.id == 'on') {
			qry += 'vendedorid '
			if(r.nombre == 'on'| r.apellido == 'on'| r.f_nacimiento == 'on'){
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

	qry += 'from Vendedor'

	console.log(qry);

	//console.log(key);
	//console.log(r.nombre);
/*
	let query = 'SELECT '
	if (key == 'on') {
		query += 'vendedorid '
	}
	console.log(query);

	*/

	console.log(r);
  //var query = 'SELECT * from Vendedor';
  let jsResponse = [];
  client.query(qry, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    jsResponse = res.rows;
    console.log(jsResponse);
    resp.render('showVendedor', {elementos : jsResponse});
  }
})



  //__dirname : It will resolve to your project folder.
})

app.get('/showVendedorperName',function(req, resp, next){
  var query = 'SELECT * from Vendedor ORDER BY nombre DESC';
  let jsResponse = [];
  client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    jsResponse = res.rows;
    console.log(jsResponse);
    resp.render('showVendedor', {elementos : jsResponse});
  }
})



  //__dirname : It will resolve to your project folder.
})



app.get('/response',function(req,res){
  var query = req.query.firstname;
  let a;
  client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    a = JSON.stringify(res.rows[0])
    console.log(a)
  }
})
  res.send(a);
  //__dirname : It will resolve to your project folder.
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
