// /ts createUnit unit=UnitTypes.dagger; amount=10 (optional); team=Team.crux (optional, defaults to player's team)
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "createUnit";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  const player = Vars.scripter;
  team = player.team;
  unit = undefined;
  amount = 1;
  
  for (i = 0; i < args.length; i++) { // parse the arguments
	if (args[i] instanceof Team) team = args[i] 
	else if (Number.isInteger(args[i])) amount = args[i]
	else if (args[i] instanceof UnitType) unit = args[i]
  }
	if (typeof unit == 'undefined') {
        player.sendMessage("No unit specified")
	} else {

	// create the units
	for(i=0;i<amount;i++){
      var e = unit.create(team);
      e.set(player.x, player.y);
	  e.add();
	}
  }

  // clean the arguments to avoid accidentally spawning 1000 crux erads
  delete unit;
  delete amount;
  delete team;

};
ts[ts.currentScriptName].function();
0;
