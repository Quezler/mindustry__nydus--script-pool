// Usage
//  /ts team <player> Team.<team>
//   Changes team of <player> to <team>
//   <player> is optional and defualts to you


if (typeof ts === 'undefined') ts = {}; ts.currentScriptName = "team";
if (typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function () {
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

	if (args.length < 2) {
		Vars.scripter.sendMessage("[#F7DC6F]Specify a player name and a team");

	} else {
		var team = undefined;
		var player = null;
		var name = null;

		for (var i = 0; i < args.length; i++) {
			if (args[i] instanceof Team) team = args[i]
			else if (typeof args[i] === 'string') name = args[i]
		}

		player = tryFindPlayer(name);
		if (player == null) {
			Vars.scripter.sendMessage(name + "[#F1948A] was not found");

		} else {
			player.team = team;
			player.spawner = null;
			player.lastSpawner = null;

			Vars.scripter.sendMessage("[#AED6F1]Team of " + player.name + "[#AED6F1] was changed to [#" + team.color + "]" + team);
		}
	}
};
ts[ts.currentScriptName].function();
0;
