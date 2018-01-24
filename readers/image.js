import Reader from "../core/reader.js";

Reader.create("IMAGE", function( response ){

	return response.blob().then(function( blob ){

		return new Promise(function( resolve, reject ){

			var image = new Image();

			image.addEventListener("load", function(){

				resolve(image);

			}, false);

			image.src = window.URL.createObjectURL(blob);

		});

	});

});