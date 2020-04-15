// /ts ghosting new_name?
// Toggles all player names to be the specified one or an empty string

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "yourScriptName";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    state.ghosted = typeof state.ghosted == 'undefined' ? true : state.ghosted;
    state.originalNames = typeof state.originalNames == 'undefined' ? {} : state.originalNames;
    
    state.ghosted = !state.ghosted;

    var newName = "";
    
    if (args.length > 0) {
        newName = typeof args[0] == 'string' ? args[0] : newName;
    }

    if (!state.ghosted) {
        playerGroup = Vars.playerGroup.all();
        for(i = 0; i < playerGroup.size; i++) {
            state.originalNames[playerGroup.get(i).uuid] = playerGroup.get(i).name;
            playerGroup.get(i).name = newName;
        }
        Vars.scripter.sendMessage("Ghosted")
    } else {
        playerGroup = Vars.playerGroup.all();
        for(i = 0; i < playerGroup.size; i++) {
            uuid = Object.keys(state.originalNames).find(uuid => playerGroup.get(i).uuid == uuid)
            if (typeof uuid != 'undefined') {
                playerGroup.get(i).name = state.originalNames[uuid];
            }
        }
        state.originalNames = {};
        Vars.scripter.sendMessage("UnGhosted")
    }
};
ts[ts.currentScriptName].function();
0;
