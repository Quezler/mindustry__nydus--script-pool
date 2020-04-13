//Kills all untis of the targetetd team
// "/ts teamSpray team=Team.<team>"
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "teamSpray";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
	const state = ts[ts.currentScriptName];

	unitGroup = Vars.unitGroup.all();

	team = args.length == 0 ? Vars.scripter.team : args[0]

	for(i=0; i < unitGroup.size; i++) {
		u = unitGroup.get(i);
		if (u.team === team){
			u.kill();
		};
	};
	delete team;  
	
	Vars.scripter.sendMessage("[white]Units killed."); 
};
ts[ts.currentScriptName].function();
0;
