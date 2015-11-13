#pragma strict

class MoveType {
	static var walk = new IgnoreAttr(false, false, true, false);
}

class AttackType {
	static var enemyOnly     = new IgnoreAttr(true, false, true, true);
	static var friendOnly    = new IgnoreAttr(true, true, true, false);
	static var selfOnly      = new IgnoreAttr(true, true, false, true);
	static var enemyExclude  = new IgnoreAttr(true, true, false, false);
	static var friendExclude = new IgnoreAttr(true, false, false, true);
	static var everyone      = new IgnoreAttr(true, false, false, false);
}

class IgnoreAttr {
	var ignoreTileType :boolean;
	var ignoreEnemy :boolean;
	var ignoreSelf :boolean;
	var ignoreFriend :boolean;

	function IgnoreAttr (ignoreTileType :boolean, ignoreEnemy :boolean, ignoreSelf :boolean, ignoreFriend :boolean) {
		this.ignoreTileType = ignoreTileType;
		this.ignoreEnemy = ignoreEnemy;
		this.ignoreSelf = ignoreSelf;
		this.ignoreFriend = ignoreFriend;
	}
}