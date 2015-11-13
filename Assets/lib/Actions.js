#pragma strict

/* 
	This component is deprecated.
 */

private var _tileSize : int;
private var _map : Map;

function Start () {
	_map = Map.getMap();
	_tileSize = _map.getTileSize();
}

function transport (player : Transform, coord : Vector3) {
	player.transform.position.x = _tileSize * coord.x;
	player.transform.position.z = _tileSize * coord.z;
}
