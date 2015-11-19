#pragma strict


// TODO This is completely deprecated. 
// Plesase use the `Helpers.getRelativeCoordsFromParams()` and `Helpers.convertRelToAbsCoords()`

class ScopeBuilder {
	static var centerX :int;
	static var centerZ :int;
	static var scope :int;
	static var ignoreAttr :IgnoreAttr;
	static var activeNodes = new List.<Node>();
	static var shadowMap : int[,];
	
	// this is building a area scope. TODO we need to build tile scope and line scope, etc
	// NOTE 2 types: yellow for selection and red for indication and function
	static function build (x :int, z :int, scope :int, ignoreAttr :IgnoreAttr) {
		if (this.centerX == x && this.centerZ == z && this.scope == scope && this.ignoreAttr == ignoreAttr) {
			if (this.activeNodes.Count) { // moved out of the tile and moved back in.
				return;
			} 
		} else {
			activeNodes.Clear();
			this.centerX = x;
			this.centerZ = z;
			this.scope = scope;
			this.ignoreAttr = ignoreAttr;
		}

		
		var start = new Node(this.centerX, this.centerZ);
		start.G = 0;
		var map = Map.getMap();
		
		shadowMap = new int[map.getX(), map.getZ()];
		var activeNodes = new List.<Node>();
		
		var stack = new List.<Node>();
		if (scope > 0) {
			stack.Add(start);
		}
		while (stack.Count) {
			var node = stack[0];
			stack.RemoveAt(0);
			
			if (shadowMap[node.x, node.z]) {
				continue;
			}
			
			shadowMap[node.x, node.z] = 1;
			activeNodes.Add(node);
			TileHighlighter.showTile(node, 'yellow');
			
			var tiles = new Tile[4];
			tiles[0] = map.getTileAt(node.x - 1, node.z);
			tiles[1] = map.getTileAt(node.x, node.z + 1);
			tiles[2] = map.getTileAt(node.x + 1, node.z);
			tiles[3] = map.getTileAt(node.x, node.z - 1);
			
			for(var tile in tiles) {
				if (tile && tile.movable) {

					var neighbor = new Node(tile.coord.x, tile.coord.z);
					neighbor.G = node.G + 1;

					if (neighbor.G <= scope) {
						stack.Add(neighbor);
					}
				}
			}
		}
		this.activeNodes = activeNodes;
	}
	
	static function destroy (x :int, z :int, scope :int, ignoreAttr :IgnoreAttr) {
		if (this.centerX == x && this.centerZ == z && this.scope == scope && this.ignoreAttr == ignoreAttr) {
			if (this.activeNodes.Count) {
				TileHighlighter.hideAllTiles('yellow');
				this.activeNodes.Clear();
			}

		}
	}
	
	static function reset () {
		this.destroy(this.centerX, this.centerZ, this.scope, this.ignoreAttr);
		this.centerX = -1;
		this.centerZ = -1;
		this.scope = -1;
		this.activeNodes.Clear();
	}
	

}