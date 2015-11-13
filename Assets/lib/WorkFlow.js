#pragma strict

class WorkFlow {
	static var actionStates = new Array('select_player', 'select_tile', 'effect');
	static var moveStates = new Array('select_player', 'select_tile', 'move');
	
	static var currentState = 0;
	
	static function nextState () {
		this.currentState += 1;
	}
	static function prevState () {
		this.currentState -= 1;
	}
	
	static function hasNextState (flowType :String) {
		var ret :boolean;
		switch (flowType) {
			case 'move':
				ret = this.moveStates[this.currentState + 1] ? true : false;
				break;
			case 'effect':
				ret = this.actionStates[this.currentState + 1] ? true : false;
				break;
			default: 
				ret = false;
		}
		return ret;
	}
	static function hasPrevState (flowType :String) {
		var ret :boolean;
		switch (flowType) {
			case 'move':
				ret = this.moveStates[this.currentState - 1] ? true : false;
				break;
			case 'effect':
				ret = this.actionStates[this.currentState - 1] ? true : false;
				break;
			default: 
				ret = false;
		}
		return ret;
	}
}