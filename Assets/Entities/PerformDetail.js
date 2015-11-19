#pragma strict

class PerformDetail {

	var id :int;
	var start_coords :Vector3[]; // all possible relative action start coords (length can be 0)
	var perform_pattern :String;
	var perform_scope :int;


	static public function buildFromParams (
		id:int, 
		start_coord:Vector3, render_pattern:String, render_scope:int,
		perform_pattern:String, perform_scope:int
	) {
		return new PerformDetail(id, new Vector3[0], start_coord, render_pattern, render_scope, Vector3.zero, perform_pattern, perform_scope);
	}


	//	var start_coord :Vector3; // RENDER start_coords (start point)
	//	var render_pattern :String; // HOW to render start_coords
	//	var render_scope :int; // how MANY to render start_coords, ***including*** start_coord (1)
	//	var render_direction :Vector3; // VERY RARE, render start_coords direction
	function PerformDetail (
		id:int, 
		start_coords:Vector3[], start_coord:Vector3, render_pattern:String, render_scope:int, render_direction:Vector3, // either start_coords or the other 4
		perform_pattern:String, perform_scope:int
	) {
		this.id = id;
		this.perform_pattern = perform_pattern;
		this.perform_scope = perform_scope;
		if (start_coords.Length > 0) {
			this.start_coords = start_coords;
		} else {
			// render start_coords from the attributes
			if (render_pattern == 'scope') {
				// total number = 1 + 2n(n-1)
				var total_number = 1+2*render_scope*(render_scope-1);
				this.start_coords = new Vector3[total_number];
				var start_coords_index = 0;
				var i:int;
				var j:int;
				for(i = -total_number + 1; i < total_number; i++) {
					for(j = -total_number + 1; j < total_number; j++) {
						if (Mathf.Abs(i) + Mathf.Abs(j) < render_scope) {
							this.start_coords[start_coords_index++] = Vector3(i, j, 0) + start_coord;
						}
					}
				}
			}
		}
	}

}