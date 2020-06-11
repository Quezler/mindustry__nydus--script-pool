// ts randomTeams <Team A> <Team B> ...
// Requires at least two teams
// There can be more then just 2 teams to chose from

ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    if (args.length < 2) {
        Vars.scripter.sendMessage("[#FFAB4C]There must be atleast [#F1948A]2 teams[] in the arguments");
        return;
    }

    for (var i = 0; i < Vars.playerGroup.size(); i++) {
        Vars.playerGroup.all().get(i).team = args[Math.floor(Math.random() * args.length)];
    }
    
    Vars.scripter.sendMessage("[#AED6F1]Randmized [#D7BDE2]team" + (Vars.playerGroup.size() == 1 ? "" : "s") + "[] of [#AF7FED]" + Vars.playerGroup.size() + "[#D7BDE2] player" + (Vars.playerGroup.size() == 1 ? "" : "s"))
};
ts[ts.currentScriptName].function();
0;
