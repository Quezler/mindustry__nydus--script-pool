// ts spawnRadius new_radius
// Sets the enemy spawn radius to new value

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "spawnRadius";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    var radius = args.length > 0 ? args[0] : undefined;
    if (typeof radius == 'undefined') {
        Vars.scripter.sendMessage("[#FFAB4C]Spawn radius is [#E6B0AA]" + Vars.state.rules.dropZoneRadius);

    } else {
        if (typeof radius == 'string') {
            radius = Number.parseFloat(radius);
        }

        Vars.state.rules.dropZoneRadius = radius;
        Call.onSetRules(Vars.state.rules);

        Vars.scripter.sendMessage("[#AED6F1]Set spawn radius to [#45B39D]" + radius);
    }
};
ts[ts.currentScriptName].function();
0;
