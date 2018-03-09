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
  res.sendFile(path.join(__dirname+'/test.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/response',function(req,res){
  var query = req.query.firstname;
  
  client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})
  res.send(query);
  //__dirname : It will resolve to your project folder.
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))