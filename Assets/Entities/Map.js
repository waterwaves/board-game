#pragma strict

class Map {
	//System config: sizeX, sizeZ, and tileSize.
	private var _x = 10;
	private var _z = 10;
	private var tileSize = 1;
	//System config: tiles
	private var _tiles = new Tile[_x,_z];

	private static var map : Map;
	
	private function Map () {
		for (var j = 0; j < _z; j++) {
			for (var i = 0; i < _x; i++) {
				_tiles[i,j] = new Tile(i, j);
			}
		}
		_tiles[4,6].setType(Tile.wall);
		_tiles[5,7].setType(Tile.wall);
		_tiles[7,7].setType(Tile.wall);
		_tiles[6,7].setType(Tile.wall);
	}
	
	static function getMap () {
		if (!map) {
			map = new Map();
		}
		return this.map;
	}
	
	function getX () {
		return _x;
	}
	
	function getZ () {
		return _z;
	}
	
	function getTileSize () {
		return tileSize;
	}
	
	function getTileAt (xIndex : int, zIndex : int) {
		if (xIndex >= _x || xIndex < 0 || zIndex >= _z || zIndex < 0) {
			return null;
		}
		return _tiles[xIndex,zIndex];
	}
}