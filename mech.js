//Switches the mech of the targeted user(defaults to you)
// "/ts mech player="name" m=Mechs.<mech>"
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "mech";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
	const state = ts[ts.currentScriptName];

	player = args.length > 0 ? Vars.playerGroup.find(boolf(p => p.name.match(args[0]))) : Vars.scripter 
	m = args.length > 1 ? args[1] : Mechs.dart;

	player.mech = m;
	player.heal();
	
	delete m;
	delete player;
	
	Vars.scripter.sendMessage("Mech changed.");
};
ts[ts.currentScriptName].function();
0;
