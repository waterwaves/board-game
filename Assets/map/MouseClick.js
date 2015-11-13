#pragma strict

RequireComponent(MouseOver);
RequireComponent(Actions);

// public variables
var player : Transform; // The player object i.e. Tester1

private var _mouseOver : MouseOver;
private var _actions : Actions;

private var _path :List.<Node>;

function Start () {
	_mouseOver  = GetComponent.<MouseOver>();
	_actions = GetComponent.<Actions>();
	WorkFlow.currentState = 0;
}

function Update () {

	// moving control
	if (WorkFlow.currentState == 2) {
		var dist = new Vector3(_path[_path.Count - 1].x, 0, _path[_path.Count - 1].z);
		if (player.transform.position != dist) {
			player.transform.position = Vector3.MoveTowards(player.transform.position, dist, Time.deltaTime * 3);
		} else {
			_path.RemoveAt(_path.Count - 1);
			if ( ! _path.Count) {
				WorkFlow.currentState = 0;
			}
		}
		return;
	}

	


	if (Input.GetMouseButtonUp(0)) {
		var nextState = false;
		var currentTileCoord = _mouseOver.currentTileCoord;
		//_actions.transport(player, currentTileCoord);

		if (WorkFlow.currentState == 0) {
			if (currentTileCoord.x == player.transform.position.x && currentTileCoord.z == player.transform.position.z) {
				var playerStats = player.GetComponent(Stats);
				ScopeBuilder.build(currentTileCoord.x, currentTileCoord.z, playerStats.movability, playerStats.moveType);
				nextState = true;
			}
		}
		
		if (WorkFlow.currentState == 1) {
			if (ScopeBuilder.shadowMap[currentTileCoord.x, currentTileCoord.z] && currentTileCoord != player.transform.position) {
				var pathFinder = PathFinder.getInstance(player.transform.position.x, player.transform.position.z);
				_path = pathFinder.getPath(currentTileCoord.x, currentTileCoord.z);

				clearTile();
				nextState = true;
			}
		}

		
		// End of mouse left click
		if (nextState && WorkFlow.hasNextState('move')) {
			WorkFlow.nextState();
		}
	}
	
	if (Input.GetMouseButtonUp(1)) {
		var prevState = false;
		// if we are choosing a position on the map
		if (WorkFlow.currentState == 1) {
			if (ScopeBuilder.centerX != -1 || ScopeBuilder.centerZ != -1) {
				clearTile();
				prevState = true;
			}
		}
		
		// End of mouse right click
		if (prevState && WorkFlow.hasPrevState('move')) {
			WorkFlow.prevState();
		}
	}
}

function clearTile () {
	ScopeBuilder.reset();
	var pathFinder = PathFinder.getInstance(0, 0);
	pathFinder.clearPath();
}