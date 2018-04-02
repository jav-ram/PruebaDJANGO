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

//twitter
var Twitter = require('twitter');
//mongo
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//crear base de datos con nombre twitter

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


//crear coleccion usuario en db twitter
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("twitter");
  dbo.createCollection("tweets", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});


var router = express.Router();

var clientTwitter = new Twitter({
  consumer_key: 'wEYoz6JKbWC83vWCSTJESuX6C',
  consumer_secret: 'flHUeNLL6PaLM8GafLR1ojZEBSxqtV38J60CtxYELfGpBnf1up',
  access_token_key: '976998317866528768-sDo0SrFxvGfADJ6rvWeH6hLgs7mgsAQ',
  access_token_secret: 'CE6M1cwwGTEXqT3BztIjfuTYDfUhW3ZkebFbTW1kSGJ5b'
});

//uso de streams de: https://github.com/desmondmorris/node-twitter/tree/master/examples
//^ no usar streams, queremos lo de cliente no en tiempo real
//iniciar mongod - ingresar documentos en coleccion

//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
//let conString = "postgres://postgres:j66352769@localhost:5432/turismo";
let conString = "postgres://postgres:admin@localhost:5432/turismo";

client = new pg.Client(conString);
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

app.get('/a', function(req, res, next){
	var params = {screen_name: 'nodejs'};
	console.log("asdasd");
	clientTwitter.get('users/show', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	});
});

//caso de Twitter
//https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html
app.get('/Twitter', function(req, resp, next) {

    let query = "select twitter from CLIENTE ;";

    client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
      resp.send('ERROR, QUERY')
    } else {
      let respuesta = res.rows;
      //console.log(respuesta[0].twitter);
      //console.log(respuesta.length);

      for(let i = 0; i < respuesta.length; i++){
        // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
        clientTwitter.get('statuses/user_timeline', { screen_name: respuesta[i].twitter, count: 10 }, function(error, tweets, response) {
          if (!error) {
            //res.status(200).render('index', { title: 'Express', tweets: tweets });
            //console.log(tweets[0]);
            //falta introducir los 10 tweets a mongo
            for (let i = 0; i < 10; i++){
              MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("twitter");
                var myobj = tweets[i];
                dbo.collection("tweets").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });
              });
            }

          }
          else {
            //res.status(500).json({ error: error });
            console.log('no funciona twter');
          }
        });
      }

    }
  })

  //falta: levantar un view que haga un query a la db y que para cada user saque los 10 tweets

});



app.get('/TwitterDisplay', function(req, resp, next) {

    let query = "select twitter from CLIENTE ;";

    var twtts = [];
    var usrs = [];

    client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
      resp.send('ERROR, QUERY')
    } else {
      let respuesta = res.rows;
      //console.log(respuesta[0].twitter);
      //console.log(respuesta.length);

      for(let i = 0; i < respuesta.length; i++){

        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("twitter");
          var query = {"user.screen_name" : respuesta[i].twitter.substr(1) };
          dbo.collection("tweets").find(query).toArray(function(err, result) {
            if (err) throw err;
            //console.log(respuesta[i].twitter);
            //como chingados parseo esto
            //console.log(result[0].text);
            //console.log(result[0].user.name);

            for(let j = 0; j < 10; j++){

              twtts.push(result[j].text);
              //console.log(twtts[j]);
              usrs.push(result[j].user.name);
              //console.log(usrs[j]);

            }

            db.close();
            //console.log(twtts);
            //console.log(usrs);
            resp.render('twuser', { tweets: twtts, users: usrs});
          });

        });

        //render the view
        //console.log('hola');


      }

    }
  })

  //falta: levantar un view que haga un query a la db y que para cada user saque los 10 tweets

});

app.get('/Graficas', function(req, resp, next){
  let venta;
  let ganancia;
  let paquete;
  let extra;
  let cliente;
  let data;
  let colors = ["'rgba(33, 150, 243,1.0)'", "'rgba(255, 87, 34,1.0)'", "'rgba(233, 30, 99,1.0)'", "'rgba(76, 175, 80,1.0)'", "'rgba(244, 67, 54,1.0)'", "'rgba(156, 39, 176,1.0)'", "'rgba(0, 188, 212,1.0)'", "'rgba(158, 158, 158,1.0)'", "'rgba(0, 150, 136,1.0)'"];
  let queryVenta = "SELECT COUNT(v.vendedorId), ve.nombre, ve.apellido, ve.vendedorId FROM vendedor as ve, venta as v WHERE v.vendedorId = ve.vendedorId GROUP BY ve.vendedorId;";
  let queryGanancia = "SELECT COUNT(v.paqueteId), vu.origen, vu.destino, p.paqueteId FROM venta as v, vuelo as vu, paquete as p WHERE v.paqueteId=p.paqueteId AND p.vueloId = vu.vueloId GROUP BY p.paqueteId, vu.origen, vu.destino;"
  let queryExtra = "SELECT COUNT(ex.extraId) as count, ex.nombre, ex.precio, (count(ex.extraId)*ex.precio) as total FROM paqueteextras as e, paquete as p, venta as v, extras as ex WHERE v.paqueteId = p.paqueteId AND p.paqueteId = e.paqueteId AND e.extraId = ex.extraId GROUP BY e.extraId, ex.nombre, ex.precio;";
  let queryCliente = "SELECT COUNT(v.clienteId), c.nombre, c.apellido FROM venta as v, cliente as c WHERE v.clienteId = c.clienteId GROUP BY v.clienteId, c.nombre, c.apellido;";
  client.query(queryVenta, (err, respu) => {
    if(err){
      console.log(err.stack);
			resp.send('ERROR, QUERY')
    } else{
      let data = [];
      let labels = "[";
      let label = "# ventas"
      let respuesta = respu.rows;
      for (let i = 0; i < respuesta.length; i++){
        data[i] = respuesta[i].count;
        labels += "'" + respuesta[i].nombre + ", " + respuesta[i].apellido + "',"
      }
      labels = labels.slice(0, -1);
      labels += "]";
      venta = createGraphic(data, colors, label, labels);
      //siguiente grafica
      client.query(queryGanancia, (err, ress) => {
        if(err){
          console.log(err.stack);
    			resp.send('ERROR, QUERY');
        } else {
          let data = [];
          let labels = "[";
          let label = "# paquetes vendidos"
          let respuesta = ress.rows;
          for (let i = 0; i < respuesta.length; i++){
            data[i] = respuesta[i].count;
            labels += "' de " + respuesta[i].origen + " a " + respuesta[i].destino + " id: "+ respuesta[i].paqueteid +"',"
          }
          labels = labels.slice(0, -1);
          labels += "]";
          paquete = createGraphic(data, colors, label, labels);
          //siguiente grafica
          client.query(queryExtra, (err, res) => {
            if (err){
              console.log(err.stack);
        			resp.send('ERROR, QUERY');
            } else {
              let data = [];
              let labels = "[";
              let label = "Q: # total vendido por extras"
              let respuesta = res.rows;
              for (let i = 0; i < respuesta.length; i++){
                data[i] = respuesta[i].total;
                labels += "'" + respuesta[i].nombre + " cant: " + respuesta[i].count + " total: "+ respuesta[i].total +"',"
              }
              labels = labels.slice(0, -1);
              labels += "]";
              extra = createGraphic(data, colors, label, labels);
              //siguiente grafica
              client.query(queryCliente, (err, re) => {
                if (err){
                  console.log(err.stack);
            			resp.send('ERROR, QUERY');
                } else {
                  let data = [];
                  let labels = "[";
                  let label = "Q: # total vendido por extras"
                  let respuesta = re.rows;
                  for (let i = 0; i < respuesta.length; i++){
                    data[i] = respuesta[i].count;
                    labels += "'" + respuesta[i].nombre + ", " + respuesta[i].apellido +"',"
                  }
                  labels = labels.slice(0, -1);
                  labels += "]";
                  cliente = createGraphic(data, colors, label, labels);
                  resp.render('graficas', {ventas:  venta, ganancias: ganancia, paquetes: paquete, extras: extra, clientes: cliente});
                }
              });

            }
          });

        }
      });
    }
  });

});


function createGraphic(data, color, label, labels) {
  return "{type: 'pie', data: {datasets:[{data: [" + data + "], backgroundColor:["+ color +"], label:'"+ label +"'}], labels:"+ labels +"}, options: {responsive: false}}";;
}

// GET response page from query
app.get('/Insert', function(req, resp, next) {
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

});

app.get('/InsertVenta', function(req, resp, next) {

  let cliente, vendedor, paquete;
  //Necesito 3 queries, el de cliente, vendedor y paquete
  let q1 = "SELECT clienteId, nombre, apellido FROM cliente;";
  let q2 = "SELECT vendedorId, nombre, apellido FROM vendedor;";
  let q3 = "SELECT p.paqueteId, v.origen, v.destino FROM paquete as p, vuelo as v WHERE p.vueloId = v.vueloId;";
  client.query(q1, (err, res) => {
    if (err){
      console.log(err.stack);
			resp.send('ERROR, QUERY')
    }else {
      client.query(q2, (err, re) => {
        if (err){
          console.log(err.stack);
    			resp.send('ERROR, QUERY')
        }else {
          client.query(q3, (err, r) => {
            if (err){
              console.log(err.stack);
        			resp.send('ERROR, QUERY')
            }else {
              cliente = res.rows;
              vendedor = re.rows;
              paquete = r.rows;
              resp.render('InsertVenta', {clientes: cliente, vendedores: vendedor, paquetes: paquete});
            }
          });
        }
      });
    }
  });



});

app.get('/ingresadaVenta', function(req, resp, next){
  let cliente = req.query.clienteId.split(",")[0];
  let vendedor = req.query.vendedorId.split(",")[0];
  let paquete = req.query.paqueteId.split(",")[0];
  let query = "INSERT INTO venta (clienteid, vendedorid, paqueteid) VALUES ('"+ cliente +"', '" + vendedor +"', '"+ paquete +"');";
  console.log(query);
  client.query(query, (err, res) => {
    if(err){
      console.log(err.stack);
			resp.send('ERROR, QUERY');
    } else {
      resp.send('Si inserto un nuevo dato');
    }
  });
});



app.get('/InsertPaquete', function(req, resp, next) {

  let vuelo;
  let atributo = [];
  //Necesito 3 queries, el de cliente, vendedor y paquete
  let q1 = "SELECT vueloId, n_avion, origen, destino  FROM vuelo;";
  atributo.push("vueloId");
  atributo.push("paqueteId");

  client.query(q1, (err, res) => {
    if (err){
      console.log(err.stack);
			resp.send('ERROR, QUERY')
    }else {
      vuelo = res.rows;
      resp.render('InsertPaquete', {atributos: atributo, vuelos: vuelo});
    }
  });



});

app.get('/ingresadoPaquete', function(req, resp, next){
  let id = req.query.paqueteId;
  let precio = req.query.precio;
  let vuelo = req.query.vueloId.split(",")[0];
  let query = "INSERT INTO paquete (vueloid, paqueteid) VALUES ('"+ vuelo +"', '"+ id +"');";
  console.log(query);
  client.query(query, (err, res) => {
    if(err){
      console.log(err.stack);
			resp.send('ERROR, QUERY');
    } else {
      resp.send('Si inserto un nuevo dato');
    }
  });
});



app.get('/InsertPQ', function(req, resp, next) {

  let extra, paquete;
  //Necesito 3 queries, el de cliente, vendedor y paquete
  let q1 = "SELECT extraId, nombre, precio FROM extras;";
  let q2 = "SELECT p.paqueteId, v.n_avion, v.origen, v.destino FROM paquete as p, vuelo as v WHERE v.vueloId = p.vueloId;";
  client.query(q1, (err, res) => {
    if (err){
      console.log(err.stack);
			resp.send('ERROR, QUERY')
    }else {
      client.query(q2, (err, re) => {
        if (err){
          console.log(err.stack);
    			resp.send('ERROR, QUERY')
        }else {
          extra = res.rows;
          paquete = re.rows;
          resp.render('InsertPQ', {extras: extra, paquetes: paquete});
        }
      });
    }
  });



});

app.get('/ingresadaPQ', function(req, resp, next){
  let paquete = req.query.paqueteId.split(",")[0];
  let extra = req.query.extraId.split(",")[0];
  console.log(req.query);
  let query = "INSERT INTO paqueteextras VALUES ('"+ paquete +"', '" + extra +"');";
  console.log(query);
  client.query(query, (err, res) => {
    if(err){
      console.log(err.stack);
			resp.send('ERROR, QUERY');
    } else {
      resp.send('Si inserto un nuevo dato');
    }
  });
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
	let jsResponse = [];
	client.query(query, (err, res) => {
		if (err) {
			console.log(err.stack);
			resp.send('ERROR, QUERY')
		} else {
			jsResponse = res.rows;
			console.log(jsResponse[0]);
			resp.send('Si se pudo!');
		}
	});

});



//Eliminar
app.get('/eliminado', function(req, resp, next) {
	let obj = req.query;
	let tabla = req.query.tabla;
	let key = Object.keys(obj)[0];
	console.log(key , tabla);

  let q = "DELETE FROM "+ tabla +" WHERE "+key+" =" + obj[key];
	console.log(q);
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

//Insert de Vendedor
app.get('/actualizado', function(req, resp, next) {
	let response = ''+req;
	let param = req.query;
	let columns = Object.keys(req.query);
	let query = "UPDATE " + param.tabla + " SET ";
	//Para no agarrar el nombre de la tabla como atributo
	for (let i  = 0; i < columns.length - 1; i++){
		query += columns[i] + "= '" + param[columns[i]] +"',";
	}
	query = query.slice(0, -1);	//Borramos la ultima coma

	query += " WHERE " + columns[0] + "=" +param[columns[0]] +";";

	console.log(query);
	console.log('aca es donde se hace el update');

	let jsResponse = [];
	client.query(query, (err, res) => {
		if (err) {
			console.log(err.stack);
			resp.send('ERROR, QUERY')
		} else {
			jsResponse = res.rows;
			console.log(jsResponse[0]);
			resp.send('Si se pudo!');
		}
	});

});

app.get('/Show',function(req, resp, next){
	let r = req.query
	let key = Object.keys(r);
	let qry = 'SELECT '

	///inicia


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
/*
			if (r[key[0]] == ''){
				qry += '* '
			}
*/

			if(key.length == 2){
				if(r[0] == undefined){
					qry += '* '
				}
			}
      let con = 0;
			for(let i = 0; i < key.length; i++){

				//console.log('test');
				if(r[key[i]] == 'on'){
					qry += key[i] + ' '
					if(r[key[i+1]] == 'on'){
						qry += ', '
					}
          con ++;
				}


			}

      if (con == 0){
        qry += '* '
      }

			qry += 'from ' + req.query.tabla;

      //existe un tipo de busqueda?
      if ((req.query.campo != undefined) && (req.query.search != undefined) && (req.query.search != "")){
        qry += ' WHERE ' + req.query.campo + " = '" + req.query.search +"';";
      }

      console.log(qry);

			client.query(qry, (err, res) => {
				if (err){
					resp.send('ERROR, QUERY')
				} else {
					resp.render('showVendedor', { atributos: jsResponse, elementos: res.rows, tabla: req.query.tabla});
				}
			});

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
