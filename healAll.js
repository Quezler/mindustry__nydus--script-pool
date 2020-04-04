// Heals all allied players
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "healAll";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
  
    playerGroup = Vars.playerGroup.all();
    
    for (i = 0; i < playerGroup.size; i++) {
        p = playerGroup.get(i);
        if (p.team === me().team) {
            p.heal();
        }
    }
};
ts[ts.currentScriptName].function();
