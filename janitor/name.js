// Usage:
//   /ts name <player> <name>
//   Changes name of <player> to <name>

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "name";
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

	if (args.length < 2) {
		Vars.scripter.sendMessage("[#F7DC6F]A player and a name is required");
	} else {
		player = tryFindPlayer(args[0]);
		name = args.length > 1 ? args[1] : "";

		if (player == null) {
			Vars.scripter.sendMessage(args[0] + "[#F1948A] was not found");
		} else {
			oldname = player.name;
			player.name = name;
			Vars.scripter.sendMessage("[#AED6F1]Changed name of [#" + player.color + "]" + oldname + "[#AED6F1] to [#" + player.color + "]" + player.name)
		}
	}

	delete tryFindPlayer;
	delete player;
	delete oldname;
	delete name;
};
ts[ts.currentScriptName].function();
0;
