// Kills all untis of the targetetd team
// /ts teamSpray Team.<team>
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "teamSpray";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
	const state = ts[ts.currentScriptName];

	var unitGroup = Vars.unitGroup.all();
	var team = args.length == 0 ? Team.crux : args[0]

	for(var i = 0; i < unitGroup.size; i++) {
		var u = unitGroup.get(i);
		if (u.team === team){
			u.kill();
		};
	};

	Vars.scripter.sendMessage("[#FFAB4C]Units of [#E6B0AA]" + team + "[] killed");
};
ts[ts.currentScriptName].function();
0;
