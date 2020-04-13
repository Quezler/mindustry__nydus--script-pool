//Switches target players team(defaults to you)
// "/ts player ="name";t=Team.<team>
if (typeof ts === 'undefined') ts = {}; ts.currentScriptName = "team";
if (typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function () {
    const state = ts[ts.currentScriptName];

    escapeColor = function(str) {
        escaped = "";
        for(i = 0; i < str.length; i++) {
            if (str[i] == "[") {
                escaped += "\\[";
                continue;
            }
            escaped += str[i];
        }
        return escaped;
    }

    if ((typeof player) === 'undefined' || (typeof player) === 'object') {
        player = Vars.scripter.name
    }

    player = Vars.playerGroup.find(boolf(p => p.name.match(escapeColor(player))));

    player.team = t;
    player.lastSpawner = null;

    delete t;
    delete player;
    delete escapeColor;

    Vars.scripter.sendMessage("Team changed.");
};
ts[ts.currentScriptName].function();
" ";
