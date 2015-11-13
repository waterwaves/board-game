#pragma strict

class Colors {
	static var yellowTile = Vector4(251.0/255, 148.0/255, 11.0/255, .64);
	static var redTile = Vector4(221.0/255, 75.0/255, 57.0/255, .64);
}

class TempData {
	static var yellowTiles = new List.<GameObject>();
	static var redTiles = new List.<GameObject>();
	
	static var yellowTileMap : GameObject[,];
	static var redTileMap : GameObject[,];
}