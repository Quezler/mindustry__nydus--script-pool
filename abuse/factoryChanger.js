// Usage:
//   /ts factoryChanger Blocks.<factory> UnitTypes.<unit> maxSpawns?
//  Changes the unit made by <factory> to <unit>. Optionally maximum units of <factory> can be changed by providing maxSpawns

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "factoryChanger";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    var factory = undefined;
    var unit = undefined;
    var maxSpawns = undefined;

    if (args.length < 2) {
        Vars.scripter.sendMessage("[#F7DC6F]Script needs factory and a unit");

    } else {
        for (var i = 0; i < args.length; i++) {
            if (Number.isInteger(args[i])) {
                maxSpawns = args[i];

            } else if (args[i] instanceof UnitType) {
                unit = args[i];

            } else if (args[i] instanceof Block) {
                factory = args[i];

            }
        }

        if (typeof factory == 'undefined' || unit == 'undefined') {
            Vars.scripter.sendMessage("[#F7DC6F]Script needs factory and a unit");
        }

        factory.unitType = unit;

        if (typeof maxSpawns !== 'undefined') {
            factory.maxSpawns = maxSpawns;
        }

        Vars.scripter.sendMessage("[#F7DC6F]Changed [#FFAB4C]" + factory.toString() + "'s[] unit to [#FFAB4C]" + unit.toString() + (typeof maxSpawns == 'undefined' ? "" : "[] and changed max spawns to [#FFAB4C]" + String(maxSpawns)))
    }
};
ts[ts.currentScriptName].function();
0;
