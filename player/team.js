//Switches target players team(defaults to you)
// "/ts player "name" Team.<team>
if (typeof ts === 'undefined') ts = {}; ts.currentScriptName = "team";
if (typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function () {
    const state = ts[ts.currentScriptName];

    function tryFindPlayer(name) {
		function stripColor(colored) {
			var colors = [
				"clear", "black", "white", "lightgray",
				"gray", "darkgray", "blue", "navy",
				"royal", "slate", "sky", "cyan",
				"teal", "green", "acid", "lime",
				"forest", "olive", "yellow", "gold",
				"goldenrod", "orange", "brown", "tan",
				"brick", "red", "scarlet", "coral", "salmon",
				"pink", "magenta", "purple", "violet", "maroon"
			];
	
			var stripped = ""
			var color = ""
			var inColor = false
	
			for (c = 0; c < colored.length; c++) {
				if (colored[c] == "[") {
					inColor = true;
					continue;
				} else if (colored[c] == "]") {
					inColor = false;
					if(typeof colors.find(c => c == color) == 'undefined') {
						if (!color.match("(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{8}$)")) {
							stripped += "[" + color + "]";
						}
					}
					color = "";
					continue;
				}
				if (inColor) {
					if (c == colored.length - 1) {
						stripped += "["
						stripped += color;
						stripped += colored[c];
						break;
					}
					color += colored[c];
					continue;
				}
				stripped += colored[c];
			}
			return stripped;
		}
	
		function escapeBracket(unescaped) {
			var escaped = "";
			for(e = 0; e < unescaped.length; e++) {
				if (unescaped[e] == "[") {
					escaped += "\\[";
					continue;
				}
				escaped += unescaped[e];
			}
			return escaped;
		}
		
		player = Vars.playerGroup.all().find(boolf(p => stripColor(p.name).match(stripColor(name))))
		if (player == 'null') {
			player = Vars.playerGroup.all().find(boolf(p => p.name.match(escapeBracket(name))));
			if (player == 'null') {
				player = Vars.playerGroup.all().find(boolf(p => stripColor(p.name).match(escapeBracket(stripColor(name)))));
				if (player == 'null') {
					player = Vars.playerGroup.all().find(boolf(p => p.name == name));
				}
			}
		}
		return player;
	}
	
	if (args.length < 2) {
		Vars.scripter.sendMessage("Specify a player name and a team");

	} else {
		team = undefined;
		player = null;
		name = null;
		
		for (i = 0; i < args.length; i++) {
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
	
		delete team;
		delete player;
		delete escapeColor;
	}
};
ts[ts.currentScriptName].function();
0;
