function init() {
	const pg = require('pg');
	//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
	var conString = "postgres://postgres:j66352769@localhost:5432/turismo";

	var client = new pg.Client(conString);
	client.connect();
}
