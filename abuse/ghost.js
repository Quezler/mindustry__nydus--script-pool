// Usage:
//   /ts ghosting new_name?
//   Changes all player names to an empty string, or optionally to the specified one

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

        Vars.scripter.sendMessage("[#D7BDE2]G[#AED6F1]h[#D7BDE2]o[#AED6F1]s[#D7BDE2]t[#AED6F1]e[#D7BDE2]d")
    } else {

        playerGroup = Vars.playerGroup.all();

        for(i = 0; i < playerGroup.size; i++) {
            uuid = Object.keys(state.originalNames).find(uuid => playerGroup.get(i).uuid == uuid);

            if (typeof uuid != 'undefined') {
                playerGroup.get(i).name = state.originalNames[uuid];
            }

        }
        state.originalNames = {};

        Vars.scripter.sendMessage("[#F7DC6F]U[#FFAB4C]n[#F7DC6F]G[#FFAB4C]h[#F7DC6F]o[#FFAB4C]s[#F7DC6F]t[#FFAB4C]e[#F7DC6F]d")
    }

    delete newName;
};
ts[ts.currentScriptName].function();
0;
