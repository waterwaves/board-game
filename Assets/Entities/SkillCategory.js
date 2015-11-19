#pragma strict

/*
	Determines the scope of skill selection and scope of skill perform.
	- Relative to mouse coord.
	- This will be stored in a Hashtable, in which `id` is the key
	  [see `loadSkillCategoriesFromCSV`].
*/
class SkillCategory {
	var id :int;
	var name :String;
	var trigger_coords :Vector3[];
	var perform_coords :Vector3[];

	function SkillCategory (id:int, name:String, trigger_coords:Vector3[], perform_coords:Vector3[]) {
		this.id = id;
		this.name = name;
		this.trigger_coords = trigger_coords;
		this.perform_coords = perform_coords;
	}

	/*
		Converts a String[] into a skillCategory object.
	*/
	static function createFromCSVRow (data:String[]) :SkillCategory{
		var id = int.Parse(data[0]);
		var name = data[1];
		var trigger_coords :Vector3[];
		// data[2] is trigger_coords, and needs to be parse out
		if (data[2] != '') {
			trigger_coords = Helpers.getVector3FromString(data[2]);
		} else {
			var trigger_type = data[3];
			var trigger_scope :int = int.Parse(data[4]);
			var trigger_direction = Helpers.getVector3FromString(data[5])[0];
			trigger_coords = Helpers.getRelativeCoordsFromParams(
				new Vector3[0],
				trigger_type, trigger_scope, trigger_direction
			);
		}

		var perform_coords :Vector3[];
		// data[6] is perform_coords, and need to be parsed out
		if (data[6] != '') {
			perform_coords = Helpers.getVector3FromString(data[6]);
		} else {
			var perform_type = data[7];
			var perform_scope :int;
			if (data[8] != '') {
				perform_scope = int.Parse(data[8]);
			} else {
				perform_scope = 1;
			}
			var perform_direction = Helpers.getVector3FromString(data[9])[0];
			perform_coords = Helpers.getRelativeCoordsFromParams(
				new Vector3[0],
				perform_type, perform_scope, perform_direction
			);
		}
		return new SkillCategory(id, name, trigger_coords, perform_coords);
	}

	/*
		Outputs/Loads a set of skillCategories (Hashtable), where `id` is key.
	*/
	static function loadSkillCategoriesFromCSV (path:String) :Hashtable {
		var data = Helpers.csvReader(path);
		var skillCategories = new Hashtable();
		for (var skillcategory_data in data) {
			var skillCategory = SkillCategory.createFromCSVRow(skillcategory_data);
			skillCategories.Add(skillCategory.id, skillCategory);
		}
		return skillCategories;
	}
}