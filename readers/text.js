import Reader from "../core/reader.js";

Reader.create("TEXT", function( response ){

	return response.text().then(function( text ){

		return text;

	});

});