// Usage:
//  /ts mech <player> Mechs.<mech>
//  changes mech of <player> to <mech>
//  <player> defualts to you

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "mech";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
	const state = ts[ts.currentScriptName];

	function tryFindPlayer(name) {
		function escapeBracket(unescaped) {
			var escaped = "";
			for(var e = 0; e < unescaped.length; e++) {
				if (unescaped[e] == "[") {
					escaped += "\\[";
					continue;
				}
				escaped += unescaped[e];
			}
			return escaped;
		}

		player = Vars.playerGroup.all().find(boolf(p => name === Strings.stripColors(p.name)));
		if (player == null) {
			player = Vars.playerGroup.all().find(boolf(p => name === escapeBracket(Strings.stripColors(p.name))))
			if (player == null) {
				player = Vars.playerGroup.all().find(boolf(p => Strings.stripColors(name) === Strings.stripColors(p.name)))
				if (player == null) {
					player = Vars.playerGroup.all().find(boolf(p => escapeBracket(Strings.stripColors(name)) === escapeBracket(Strings.stripColors(p.name))))
					if (player == null) {
						player = Vars.playerGroup.all().find(boolf(p => name === p.name))
						if (player == null) {
							player = Vars.playerGroup.all().find(boolf(p => Strings.stripColors(p.name).match(name)))
							if (player == null) {
								player = Vars.playerGroup.all().find(boolf(p => escapeBracket(Strings.stripColors(p.name)).match(name)))
								if (player == null) {
									player = Vars.playerGroup.all().find(boolf(p => Strings.stripColors(p.name).match(Strings.stripColors(name))))
									if (player == null) {
										player = Vars.playerGroup.all().find(boolf(p => escapeBracket(Strings.stripColors(p.name)).match(escapeBracket(Strings.stripColors(name)))))
									}
								}
							}
						}
					}
				}
			}
		}
		return player;
	}

	if (args.length == 0) {
		Vars.scripter.sendMessage("[#F7DC6F]Specify player and mech");
	} else {
		var player = Vars.scripter;
		var mech = undefined;
		var p = undefined;

		for (var i = 0; i < args.length; i++) {
			if (typeof args[i] === 'string') p = args[i];
			else if (args[i] instanceof Mech) mech = args[i];
		}

		if (typeof p !== 'undefined') player = tryFindPlayer(p);

		if (player == null) {
			Vars.scripter.sendMessage(p + "[#F1948A] was not found");

		} else if (typeof mech == 'undefined') {
			Vars.scripter.sendMessage("[#F7DC6F]A mech is needed to change the mech of a player");

		} else {
			player.mech = mech;
			player.heal();

			Vars.scripter.sendMessage("[#F7DC6F]Changed mech to [#FFAB4C]" + mech.toString() + (player === Vars.scripter ? "" : "[] of [#" + player.color + "]" + player.name));
		}
	}
}
ts[ts.currentScriptName].function();
0;
