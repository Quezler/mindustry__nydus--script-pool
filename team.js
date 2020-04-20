//Switches target players team(defaults to you)
// "/ts player "name" Team.<team>
if (typeof ts === 'undefined') ts = {}; ts.currentScriptName = "team";
if (typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function () {
    const state = ts[ts.currentScriptName];

    escapeColor = function(str) {
        escaped = "";
        for(i = 0; i < str.length; i++) {
            if (str[i] == "[") {
                escaped += "\\[";
                continue;
            }
            escaped += str[i];
        }
        return escaped;
    }
	
	if (args.length == 0) {
		Vars.scripter.sendMessage("Specify  player name and a team")
	} else {
		team = undefined;
		player = Vars.scripter;
		
		for (i = 0; i < args.length; i++) {
			if (args[i] instanceof Team) team = args[i]
			else if (typeof args[i] === 'string') player = args[i]
		}
		
		player = Vars.playerGroup.find(boolf(p => p.name.match(escapeColor(player))));
		
		player.team = team;
		player.lastSpawner = null;

		delete team;
		delete player;
		delete escapeColor;

		Vars.scripter.sendMessage("Team changed.");
	}
};
ts[ts.currentScriptName].function();
0;
