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
