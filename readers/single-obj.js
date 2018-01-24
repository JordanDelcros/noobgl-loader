import Reader from "../core/reader.js";

Reader.create("SINGLE_OBJ", function( response ){

	return response.text().then(function( text ){

		var lines = text.split(/\n/g);

		var v = new Array();

		var vn = new Array();

		var vt = new Array();

		var f = new Array();

		for( let line of lines ){

			let infos = line.split(/\s/g);

			let type = infos.shift();

			if( type == "v" ){

				let coordinates = infos.map(parseFloat);

				v.push([coordinates[0], coordinates[1], coordinates[2]])

			}
			else if( type == "vt" ){

				let coordinates = infos.map(parseFloat);

				vt.push([coordinates[0], coordinates[1]])

			}
			else if( type == "vn" ){

				let coordinates = infos.map(parseFloat);

				vn.push([coordinates[0], coordinates[1], coordinates[2]])

			}
			else if( type == "f" ){

				let a = infos[0].split(/\//g).map(int => parseInt(int) - 1);

				let b = infos[1].split(/\//g).map(int => parseInt(int) - 1);

				let c = infos[2].split(/\//g).map(int => parseInt(int) - 1);

				f.push([a, b, c]);

			};

		};

		var vertices = new Float32Array(f.length * 3 * 3);

		var textures = new Float32Array(f.length * 3 * 2);

		var normals = new Float32Array(vertices.length);

		for( let index = 0, length = f.length; index < length; index++ ){

			var a = f[index][0];
			var b = f[index][1];
			var c = f[index][2];

			var vertexA = v[a[0]];
			var vertexB = v[b[0]];
			var vertexC = v[c[0]];

			vertices[index * 9 + 0] = vertexA[0];
			vertices[index * 9 + 1] = vertexA[1];
			vertices[index * 9 + 2] = vertexA[2];
				vertices[index * 9 + 3] = vertexB[0];
				vertices[index * 9 + 4] = vertexB[1];
				vertices[index * 9 + 5] = vertexB[2];
					vertices[index * 9 + 6] = vertexC[0];
					vertices[index * 9 + 7] = vertexC[1];
					vertices[index * 9 + 8] = vertexC[2];

			var textureA = vt[a[1]];
			var textureB = vt[b[1]];
			var textureC = vt[c[1]];

			textures[index * 6 + 0] = textureA[0];
			textures[index * 6 + 1] = textureA[1];
				textures[index * 6 + 2] = textureB[0];
				textures[index * 6 + 3] = textureB[1];
					textures[index * 6 + 4] = textureC[0];
					textures[index * 6 + 5] = textureC[1];

			var normalA = vn[a[2]];
			var normalB = vn[b[2]];
			var normalC = vn[c[2]];

			normals[index * 9 + 0] = normalA[0];
			normals[index * 9 + 1] = normalA[1];
			normals[index * 9 + 2] = normalA[2];
				normals[index * 9 + 3] = normalB[0];
				normals[index * 9 + 4] = normalB[1];
				normals[index * 9 + 5] = normalB[2];
					normals[index * 9 + 6] = normalC[0];
					normals[index * 9 + 7] = normalC[1];
					normals[index * 9 + 8] = normalC[2];

		};

		return { vertices, normals, textures };

	});

});