#pragma strict

class TileHighlighter {
	
	static function showTile (node : Node, color : String) {
		var clone :GameObject;
		if (color == 'yellow') {
			clone = GameObject.Instantiate(GameObject.FindGameObjectWithTag('highlight'), Vector3(node.x, 0, node.z), Quaternion.identity);
			clone.GetComponent.<Renderer>().material.color = Colors.yellowTile;
			TempData.yellowTiles.Add(clone);
			TempData.yellowTileMap[node.x, node.z] = clone;
		} else if (color == 'red') {
			if (TempData.yellowTileMap[node.x, node.z]) {
				TempData.yellowTileMap[node.x, node.z].GetComponent.<Renderer>().material.color = Colors.redTile;
			} else {
				clone = GameObject.Instantiate(GameObject.FindGameObjectWithTag('highlight'), Vector3(node.x, 0, node.z), Quaternion.identity);
				clone.GetComponent.<Renderer>().material.color = Colors.redTile;
				TempData.redTiles.Add(clone);
				TempData.redTileMap[node.x, node.z] = clone;
			}
		}
	}
	
	static function showTiles (nodeList : List.<Node>, color : String) {
		for (var node in nodeList) {
			this.showTile(node, color);
		}
	}
	
	static function hideAllTiles (color :String) {
		// delete them for now. Maybe in future we can reuse it
		if (color == 'yellow') {
			if(TempData.yellowTiles.Count) {
				for(var highlightedTile in TempData.yellowTiles) {
					GameObject.Destroy(highlightedTile);
				}
				TempData.yellowTiles.Clear();
			}
		} else if (color == 'red') {
			if(TempData.redTiles.Count) {
				for(var highlightedTile in TempData.redTiles) {
					GameObject.Destroy(highlightedTile);
				}
				TempData.redTiles.Clear();
			}
			for (var highlightedTile in TempData.yellowTiles) {
				highlightedTile.GetComponent.<Renderer>().material.color = Colors.yellowTile;
			}
		}
	}
	
	static function hasHighlightedTiles (color :String) {
		if (color == 'yellow') {
			if(TempData.yellowTiles.Count) {
				return true;
			} else {
				return false;
			}
		} else if (color == 'red') {
			if(TempData.redTiles.Count) {
				return true;
			} else {
				for(var highlightedTile in TempData.yellowTiles) {
					if (highlightedTile.GetComponent.<Renderer>().material.color == 'red') {
						return true;
					}
				}
				return false;
			}
		}
		return false;
	}
	
}