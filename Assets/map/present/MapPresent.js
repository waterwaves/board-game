#pragma strict

@script RequireComponent(MeshFilter)
@script RequireComponent(MeshRenderer)
@script RequireComponent(MeshCollider)

import System.Collections.Generic;

private var map : Map;
private var sizeX : int;
private var sizeZ : int;
private var tileSize : int;

var tileTexture : Texture2D;
private var tileRes = 16; // tile resolution should depend on tile texture picture data

function Start () {
	map = Map.getMap();
	sizeX = map.getX();
	sizeZ = map.getZ();
	tileSize = map.getTileSize();
	BuildMesh();
}

function chopTilesFromTexturePicture () {
	var columns : int = tileTexture.width / tileRes;
	var rows : int = tileTexture.height / tileRes;
		
	var tiles = new List.<Color[]>();
	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < columns; x++) {
			tiles.Add(tileTexture.GetPixels(x * tileRes, y * tileRes, tileRes, tileRes));
		}
	}
	return tiles;
}

function BuildTileTexture () {
	var mapXPixels = sizeX * tileRes;
	var mapZPixels = sizeZ * tileRes;
	var texture = new Texture2D(mapXPixels, mapZPixels);
	
	var tiles = chopTilesFromTexturePicture();
	for (var y = 0; y < sizeZ; y++) {
		for (var x = 0; x < sizeX; x++) {
			var tile = tiles[map.getTileAt(x, y).type];
			texture.SetPixels(x * tileRes, y * tileRes, tileRes, tileRes, tile);
		}
	}
	texture.filterMode = FilterMode.Point;
	texture.wrapMode = TextureWrapMode.Clamp;
	texture.Apply();
	
	var meshRenderer = GetComponent.<MeshRenderer>();
	meshRenderer.sharedMaterials[0].mainTexture = texture;
}

function BuildMesh () {
	var tileNumber = sizeX * sizeZ;
	var triangleNumber = tileNumber * 2;
	
	// vertices always one more than squares
	var verticesCountX = sizeX + 1;
	var verticesCountZ = sizeZ + 1;
	
	// Build mesh data	
	var vertices = new Vector3[verticesCountX * verticesCountZ];
	var triangles = new int[triangleNumber * 3];
	var normals = new Vector3[verticesCountX * verticesCountZ];
	var uv = new Vector2[verticesCountX * verticesCountZ];
	
	
	var x : float;
	var z : float;
	
	for (x = 0; x < verticesCountX; x++) {
		for (z = 0; z < verticesCountZ; z++) {
			vertices[z * verticesCountX + x] = new Vector3(x * tileSize - .5, 0, z * tileSize - .5); // shift map to center-standandard, which is center coords.
			normals[z * verticesCountX + x] = Vector3.up;
			uv[z * verticesCountX + x] = new Vector2(x / sizeX, z / sizeZ);
		}
	}
	
	for (x = 0; x < sizeX; x++) {
		for (z = 0; z < sizeZ; z++) {
			var squareIndex = z * sizeX + x;
			var triangleOffset = squareIndex * 6;
			triangles[triangleOffset + 0] = z * verticesCountX + x + 0;
			triangles[triangleOffset + 1] = (z + 1) * verticesCountX + x + 0;
			triangles[triangleOffset + 2] = (z + 1) * verticesCountX + x + 1;
			triangles[triangleOffset + 3] = z * verticesCountX + x + 0;
			triangles[triangleOffset + 4] = (z + 1) * verticesCountX + x + 1;
			triangles[triangleOffset + 5] = z * verticesCountX + x + 1;
		}
	}

	
	var mesh = new Mesh();
	
	mesh.vertices = vertices;
	mesh.triangles = triangles;
	mesh.normals = normals;
	mesh.uv = uv;
	
	var meshFilter = GetComponent.<MeshFilter>();
	var meshRenderer = GetComponent.<MeshRenderer>();
	var meshCollider = GetComponent.<MeshCollider>();
	
	meshFilter.mesh = mesh;
	meshCollider.sharedMesh = mesh;
	
	BuildTileTexture();
}
