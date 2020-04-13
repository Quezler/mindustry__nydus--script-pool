//Switches the mech of the targeted user(defaults to you)
// "/ts mech player="name" m=Mechs.<mech>"
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "mech";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
	const state = ts[ts.currentScriptName];

	if (args.length == 0) {
		Vars.scripter.sendMessage("Specify atleast something");
	} else {
		player = Vars.scripter;
		mech = undefined;
		
		for (i = 0; i < args.length; i++) {
			if (typeof args[i] == 'string') player = Vars.playerGroup.find(boolf(p => p.name.match(args[i])))
			else if (args[i] instanceof Mech) mech = args[i]
		}
		
		if (String(player) == 'null') {
			Vars.scripter.sendMessage("Player was not found");
		} else if (typeof mech == 'undefined') {
			Vars.scripter.sendMessage("Mech is not specified");
		} else {
			player.mech = mech;
			player.heal();
			
			delete mech;
			delete player;
	
			Vars.scripter.sendMessage("Mech changed.");
		}
	}
}
ts[ts.currentScriptName].function();
0;
