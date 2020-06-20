// ts randomTeams <Team A> <Team B> ...
// If there are no teams specified uses the team cores available on map

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "randomTeams";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    for (var i = 0; i < Vars.playerGroup.size(); i++) {
        if (args.length < 2) {
            Vars.playerGroup.all().get(i).team = Vars.state.teams.active.get(Math.floor(Math.random() * Vars.state.teams.active.size)).team;
        } else {
            Vars.playerGroup.all().get(i).team = args[Math.floor(Math.random() * args.length)];
        }

        Vars.playerGroup.all().get(i).spawner = null;
        Vars.playerGroup.all().get(i).lastSpawner = null;
        Vars.playerGroup.all().get(i).kill();
    }
    
    Vars.scripter.sendMessage("[#AED6F1]Randmized [#D7BDE2]team" + (Vars.playerGroup.size() == 1 ? "" : "s") + "[] of [#AF7FED]" + Vars.playerGroup.size() + "[#D7BDE2] player" + (Vars.playerGroup.size() == 1 ? "" : "s"))
};
ts[ts.currentScriptName].function();
0;
