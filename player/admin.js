// /ts admin "BlueWolf"
// block please don't bap me 
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "admin";
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
	}
		js player.isAdmin = true 

};
ts[ts.currentScriptName].function();