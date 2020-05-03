// ts spawnRadius new_radius
// Sets the enemy spawn radius to new value

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "spawnRadius";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
    
    radius = args.length > 0 ? args[0] : undefined;
    if (typeof radius == 'undefined') {
        Vars.scripter.sendMessage("Specify a radius")
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
