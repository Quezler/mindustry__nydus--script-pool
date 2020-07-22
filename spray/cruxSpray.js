// Kills all units belonging to Team.crux

if (typeof ts === 'undefined') ts = {}; ts.currentScriptName = "cruxSpray";
if (typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function () {
    const state = ts[ts.currentScriptName];

    var unitGroup = Vars.unitGroup.all();

    for (var i = 0; i < unitGroup.size; i++) {
        var u = unitGroup.get(i);
        if (u.team === Team.crux) {
            u.kill();
        }
    }
    Vars.scripter.sendMessage("[#E6B0AA]Crux [#FFAB4C]units killed");
};
ts[ts.currentScriptName].function();
0;
