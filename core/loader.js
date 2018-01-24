import Reader from "./reader.js";

export default class Loader {
	constructor( path, reader = null ){

		return this.fetch(path).then(function( response ){

			if( reader instanceof Function ){

				return reader(response);

			}
			else {

				return response;

			};

		});

	}
	async fetch( path ){

		return await fetch(path);

	}
}