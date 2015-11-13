#pragma strict

function Start () {
	// initiate tile GO holder
	var map = Map.getMap();
	TempData.yellowTileMap = new GameObject[map.getX(), map.getZ()];
	TempData.redTileMap = new GameObject[map.getX(), map.getZ()];
}

function Update () {

}