const HOOKS = new Array();

class Reader {
	static create( name, action ){

		HOOKS.push({
			name: name.toUpperCase(),
			action: action
		});

		return Reader;

	}
}

export default new Proxy(Reader, {
	get( target, property ){

		if( target[property] != undefined ){

			return target[property];

		}
		else {

			for( let hook of HOOKS ){

				if( hook.name == property ){

					return hook.action;

				};

			};

		};

	}
})