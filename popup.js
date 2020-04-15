// /ts warn "player name pattern" "Warning message/reason" 

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "popup";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    tryFindPlayer = function(name) {
        stripColor = function(name) {
            var stripped = ""
            var inColor = false
            for (i = 0; i < name.length; i++) {
                if (name[i] == "[") {
                    inColor = true;
                } else if (name[i] == "]") {
                    inColor = false;
                    continue;
                }
                if (inColor) continue;
                
                stripped += name[i];
            }
            return stripped;
        }

        player = Vars.playerGroup.all().find(boolf(p => p.name.match(name)));
        if (String(player) == 'null') {
            player = Vars.playerGroup.all().find(boolf(p => stripColor(p.name).match(stripColor(args[0]))))
            if (String(player) == 'null') {
                player = Vars.playerGroup.all().find(boolf(p => p.name == name))
            }
        }

        return player;
    }

    if (args.length <= 1) {
        Vars.scripter.sendMessage("Specify the Player's name and the message")
    } else {
        player = tryFindPlayer(args[0]);
        if (String(player) == 'null') {
            Vars.scripter.sendMessage(args[0] + " [#EC7063]was not found on the server")
        } else {
            Call.onInfoMessage(player.con, args[1]);
            Vars.scripter.sendMessage("[#5DADE2]A [#76D7C4]popup[] has been sent to []" + player.name)
        }
    }
};
ts[ts.currentScriptName].function();
0;
