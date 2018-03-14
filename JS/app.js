const express = require('express')
const app = express()
//const pg = require('pg');
var path = require("path");
const pg = require('pg');
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
var conString = "postgres://postgres:j66352769@localhost:5432/turismo";

var client = new pg.Client(conString);
client.connect();


app.use(express.static(__dirname));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/query.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/query',function(req,res){
  res.sendFile(path.join(__dirname+'/query.html'));
  //__dirname : It will resolve to your project folder.
});

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
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))