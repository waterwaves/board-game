#pragma strict

class PathFinder {
	private static var _map : Map;
	private static var _start : Node;
	private static var _end : Node;
	private static var _readyNodes : List.<Node>;
	private static var _shadowMap : int[,];
	private static var _path : List.<Node>;
	private static var _hasReset = false;
	private static var _highlightColor = 'red';
	
	private static var pathFinder : PathFinder;
	
	private function PathFinder (startX : int, startZ : int) {
		this._map = Map.getMap();
		this._start = new Node(startX, startZ);
		this._readyNodes = new List.<Node>();
		this._shadowMap = new int[_map.getX(), _map.getZ()];
		_start.G = 0;
	}
	
	static function getInstance (startX : int, startZ : int) {
		if (!this.pathFinder) {
			this.pathFinder = new PathFinder(startX, startZ);
			return this.pathFinder;
		}
		if (this._start.x != startX || this._start.z != startZ) {
			this._start = new Node(startX, startZ);
			this.reset(); // reset shadowMap, readyNode, and highlightedTile
		}
		return this.pathFinder;
	}
	
	private static function reset () {
		_shadowMap = new int[_map.getX(), _map.getZ()];
		_shadowMap[_start.x, _start.z] = 1;
		_readyNodes.Clear();
		TileHighlighter.hideAllTiles(_highlightColor);
		_hasReset = true;
	}

	// this is more like looking for valid neighbors.
	private function addNeighbors (node : Node, end : Node) {

		var tiles = new Tile[4];
			
		tiles[0] = _map.getTileAt(node.x - 1, node.z);
		tiles[1] = _map.getTileAt(node.x, node.z + 1);
		tiles[2] = _map.getTileAt(node.x + 1, node.z);
		tiles[3] = _map.getTileAt(node.x, node.z - 1);
		
		for(var tile in tiles) {
			if (tile && tile.movable && !_shadowMap[tile.x, tile.z]) {
				_shadowMap[tile.x, tile.z] = 1;
				
				var neighbor = new Node(tile.x, tile.z);
				neighbor.from = node;
				neighbor.G = node.G + 10;
				neighbor.H = Mathf.Sqrt(Mathf.Pow(tile.x - end.x, 2) + Mathf.Pow(tile.z - end.z, 2)) * 10;
				neighbor.F = neighbor.G + neighbor.H;
				_readyNodes.Add(neighbor);
			}
		}
	}

	private function minIndexOfReadyNodes () {
		var min = Mathf.Infinity;
		var index : int;
		for (var i = 0; i < _readyNodes.Count; i++) {
			if (_readyNodes[i].F < min) {
				min = _readyNodes[i].F;
				index = i;
			}
		}
		return index;
	}
	

	function findPath (endX :int, endZ :int, returnPath :boolean, showPath :boolean) {
		if (_end && _end.x == endX && _end.z == endZ && _path.Count) {
			if (showPath && !TileHighlighter.hasHighlightedTiles(_highlightColor)) {
				TileHighlighter.showTiles(_path, _highlightColor);
				this._hasReset = false;
			}
			
			return returnPath ? this._path : new List.<Node>();
		} else {
			reset();
			this._hasReset = false;
		}
		var end = new Node(endX, endZ);
		this._end = end;

		var node = _start;
		var i = 0;
		while (node.x != end.x || node.z != end.z && i++ < 100) {
			addNeighbors(node, end);
			
			var minIndex = minIndexOfReadyNodes();
			node = _readyNodes[minIndex];
			_readyNodes.RemoveAt(minIndex);
		}
		this._path = new List.<Node>();
		i = 0;
		while (node.from && i++ < 100) {
			this._path.Add(node);
			if (showPath) {
				TileHighlighter.showTile(node, _highlightColor);
			}
			node = node.from;
		}
		return returnPath ? this._path : new List.<Node>();
	}
	
	function getPath (endX : int, endZ : int) {
		return this.findPath(endX, endZ, true, false);
	}
	
	function clearPath () {
		if (!this._hasReset) {
			this.reset();
		}
	}

}