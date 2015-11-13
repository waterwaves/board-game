#pragma strict

/*
	This component needs to be attached to TileMap GO/
*/

var currentTileCoord : Vector3;
var selectionCube : Transform;

// player should be reconsidered to pass-in.
var player : Transform; // The player object i.e. Tester1

private var tileSize : float;

function Start () {
	var map = Map.getMap();
	tileSize = map.getTileSize();
	selectionCube.transform.localScale = new Vector3(tileSize * .95, 0.01, tileSize * .95);
}

function Update () {
	var ray = Camera.main.ScreenPointToRay( Input.mousePosition );
	var hitInfo : RaycastHit;
	
	if(GetComponent.<Collider>().Raycast(ray, hitInfo, Mathf.Infinity)) {
		currentTileCoord.x = Mathf.RoundToInt( hitInfo.point.x / tileSize);
		currentTileCoord.z = Mathf.RoundToInt( hitInfo.point.z / tileSize);
				
		// show mouse-over highlighted tile.
		selectionCube.transform.position = currentTileCoord * tileSize;
		
		if (WorkFlow.currentState == 1) {
			var pathFinder = PathFinder.getInstance(player.transform.position.x, player.transform.position.z);
			if (ScopeBuilder.shadowMap[currentTileCoord.x, currentTileCoord.z]) {
				pathFinder.findPath(currentTileCoord.x, currentTileCoord.z, false, true);
			} else {
				pathFinder.clearPath();
			}
		}
		
	}
}
