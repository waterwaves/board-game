#pragma strict

// Tile is a DS for map
class Tile {

	static var land = 0;
	static var wall = 1;
	
	var x : int;
	var z : int;
	
	var type = land;
	var movable = true;
	
	function Tile (x : int, z : int) {
		this.x = x;
		this.z = z;
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