#pragma strict

/*
	Tile is the unit of Map.
	@(x, z) Coords, TODO need to be converted to Vector3
	@setType(type_number): pass in type number (e.g. `Tile.land`) to render the tile type
*/
class Tile {

	static var land = 0;
	static var wall = 1;
	
	
	var coord :Vector3;
	
	var type = land;
	var movable = true;

	function Tile (x : int, z : int) {
		this.coord = Vector3(x, 0, z);
	}
	
	function setType (n :int) {
		switch (n) {
			case 0:
				this.type = 0;
				this.movable = true;
				break;
			case 1:
				this.type = 1;
				this.movable = false;
		}
	}
}

// Node is a DS for calculation
class Node {

	var x : int;
	var z : int;

	// "from" and "F" are for A* algorithm.
	var from : Node;
	var G : int; // cost from "start" node
	var H : int; // estimated cost to "end" node
	var F : int;
	
	function Node (x : int, z : int) {
		this.x = x;
		this.z = z;
	}
}