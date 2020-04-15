// Heals all allied players
// ts healAll team=Team.<name [optional]> 
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "healAll";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
    
	team = (args.length == 0) ? Vars.scripter.team : args[0]
    playerGroup = Vars.playerGroup.all()
    
    for (i = 0; i < playerGroup.size; i++) {
        p = playerGroup.get(i);
        if (p.team === team) {
            p.heal();
        }
    }
    
    Vars.scripter.sendMessage("[#58D68D]Healed all [#" + team.color + "]" + String(team) + "[] players")
};
ts[ts.currentScriptName].function();
0;
