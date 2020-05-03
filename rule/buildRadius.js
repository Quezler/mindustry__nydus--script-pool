// ts buildRadius new_radius
// Sets the build radius to new value, 0 to disable

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "buildRadius";
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
        Vars.state.rules.enemyCoreBuildRadius = radius;
        Call.onSetRules(Vars.state.rules);

        Vars.scripter.sendMessage((radius == 0) ? "[#F7DC6F]Disabled [#AED6F1]core build radius" : "[#AED6F1]Set build radius to [#45B39D]" + radius);
    }
};
ts[ts.currentScriptName].function();
0;
