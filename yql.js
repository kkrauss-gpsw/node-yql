
var http = require("http");

exports.get = function(yql, callback){

	yql = yql.replace(/\s/g, "%20").replace(/\=/g, '%3D');

	var client 	= http.createClient(80, "query.yahooapis.com");
	var url 	= "http://query.yahooapis.com/v1/public/yql?q=" + yql + "&format=json";
	var request = client.request("GET", url, {"host": "search.twitter.com", "User-Agent": "NodeJS HTTP Client"});

	request.addListener('response', function (response) {

		var responseBody = '';

		response.addListener("data", function (chunk) {	
			responseBody += chunk;
		});

		response.addListener("end", function () {
			callback(JSON.parse(responseBody));
		});

	});

	request.close();

}