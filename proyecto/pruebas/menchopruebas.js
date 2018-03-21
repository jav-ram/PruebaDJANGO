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
