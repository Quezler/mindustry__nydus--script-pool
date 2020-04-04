// /ts createUnit unit=UnitTypes.dagger
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "createUnit";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  var me = me();
  var e = unit.create(me.team);
  e.set(me.x, me.y);
  e.add();
  // clean the arguments
  delete unit;

};
ts[ts.currentScriptName].function();
