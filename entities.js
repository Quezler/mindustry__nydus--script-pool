// lists all entites or a specific group from all teams or the specified one
// entites t="Team.<> [Optional], g=Vars.<group>"

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "entities";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    getList = function(group) {
        list = {};
        if (group.size == 0) return "none";
        for (i = 0; i < group.size; i++) {
            entity = group.get(i);
            list[entity.team] = typeof list[entity.team] == 'undefined' ? 1 : list[entity.team] += 1
        }
        return list;
    }
    sendList = function(list) {
        if (list == "none") { 
            me().sendMessage("   None");
        } else {
            if (typeof t == "undefined") {
                teams = Object.keys(list);
                for(i = 0; i < teams.length; i++) {
                    t = Structs.find(Team.all(), boolf(t => t.name.equals(teams[i])));
                    me().sendMessage("  [#" + String(t == 'null' ? "ffffff" : t.color)  + "]" + String(teams[i]) + "[] " + String(list[teams[i]]));
                }
            } else {
                me().sendMessage("  [#" + t.color + "]" + t.name + "[] " + String(typeof list[t] == 'undefined' ? "None" : list[t]));
            }
        }

        if (typeof g == "undefined") {
            me().sendMessage("");
        }

        delete list;
    }

    if (typeof g == 'undefined') {
        me().sendMessage("Units:");
        sendList(getList(Vars.unitGroup.all()));

        me().sendMessage("Bullets:");
        sendList(getList(Vars.bulletGroup.all()));

        me().sendMessage("Players:");
        sendList(getList(Vars.playerGroup.all()));

        me().sendMessage("Tiles:");
        sendList(getList(Vars.tileGroup.all()));
    } else {
        sendList(getList(g.all()));
    }

    delete sendList;
    delete getList;
    delete t;
    delete g;

};
ts[ts.currentScriptName].function();
" ";
