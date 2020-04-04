// /ts createUnit unit=UnitTypes.dagger; amount=10 (optional); team=Team.crux (optional, defaults to player's team)
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "createUnit";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  const player = me();

  // set default if optional parameters are not specified
  const amount1 = (typeof amount === 'undefined') ? 1 : amount;
  const team1 = (typeof team === 'undefined') ? player.team : team;

  // create the units
  for(i=0;i<amount1;i++){
    var e = unit.create(team1);
    e.set(player.x, player.y);
    e.add();
  }

  // clean the arguments to avoid accidentally spawning 1000 crux erads
  delete unit;
  delete amount;
  delete team;

};
ts[ts.currentScriptName].function();
