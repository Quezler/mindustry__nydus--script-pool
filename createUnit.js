// /ts createUnit unit=UnitTypes.dagger
if(typeof ts === 'undefined') ts = {}; ts.createUnit = "createUnit";
if(typeof ts[ts.createUnit] === 'undefined') ts[ts.createUnit] = {};
ts[ts.createUnit].function = function(){
  const state = ts[ts.createUnit];

  var me = me();
  var e = unit.create(me.team);
  e.set(me.x, me.y);
  e.add();
  delete e;
  delete me;

  }
};
ts[ts.createUnit].function();
