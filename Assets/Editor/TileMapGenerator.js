#pragma strict

@CustomEditor(MapPresent)
class TileMapGenerator extends Editor {

	override function OnInspectorGUI() {
		DrawDefaultInspector();
		if(GUILayout.Button('Regenerate')) {
			var tileMap : MapPresent = target as MapPresent;
//			tileMap.BuildMesh();
			tileMap.Start();
		}
	}

}