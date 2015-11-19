#pragma strict

var startTileX = 0;
var startTileZ = 0;
private var _map = Map.getMap();

private var self : GameObject;
private var tileSize : int;

function Start () {
	self = gameObject;
	tileSize = _map.getTileSize();
	if (startTileX >= 0 && startTileX < _map.getX()
		&& startTileZ >= 0 && startTileZ < _map.getZ()) {
		self.transform.position.x = tileSize * startTileX;
		self.transform.position.z = tileSize * startTileZ;
	}
}

function Update () {

}