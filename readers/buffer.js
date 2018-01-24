import Reader from "../core/reader.js";

Reader.create("BUFFER", function( response ){

	return response.arrayBuffer().then(function( buffer ){

		return buffer;

	});

});