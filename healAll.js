// Heals all allied players
// ts healAll team=Team.<name [optional]> 
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "healAll";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
    
    // if (team === undefined) team = Vars.scripter.team
  
    playerGroup = Vars.playerGroup.all();
    
    for (i = 0; i < playerGroup.size; i++) {
        p = playerGroup.get(i);
        if (p.team === Vars.scripter.team) {
            p.heal();
        }
    }
    
    "[green]Healed all[] " + String(Vars.scripter.team) + " [green]players"
};
ts[ts.currentScriptName].function();
