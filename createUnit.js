// /ts createUnit unit=UnitTypes.dagger; amount=10 (optional)
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "createUnit";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  var player = me();
  var amount1 = (typeof amount === 'undefined') ? 1 : amount;
  for(i=0;i<amount1;i++){
    var e = unit.create(player.team);
    e.set(player.x, player.y);
    e.add();
  }
  // clean the arguments
  delete unit;
  delete amount;

};
ts[ts.currentScriptName].function();
