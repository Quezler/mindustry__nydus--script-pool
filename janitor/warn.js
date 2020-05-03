// /ts warn "player name pattern" "Warning message/reason" 

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "warn";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    function tryFindPlayer(name) {
        function stripColor(colored) {
            var colors = [
                "clear", "black", "white", "lightgray",
                "gray", "darkgray", "blue", "navy",
                "royal", "slate", "sky", "cyan",
                "teal", "green", "acid", "lime",
                "forest", "olive", "yellow", "gold",
                "goldenrod", "orange", "brown", "tan",
                "brick", "red", "scarlet", "coral", "salmon",
                "pink", "magenta", "purple", "violet", "maroon"
            ];
    
            var stripped = ""
            var color = ""
            var inColor = false
    
            for (i = 0; i < colored.length; i++) {
                if (colored[i] == "[") {
                    inColor = true;
                    continue;
                } else if (colored[i] == "]") {
                    inColor = false;
                    if(typeof colors.find(c => c == color) == 'undefined') {
                        if (!color.match("(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{8}$)")) {
                            stripped += "[" + color + "]";
                        }
                    }
                    color = "";
                    continue;
                }
                if (inColor) {
                    if (i == colored.length - 1) {
                        stripped += "["
                        stripped += color;
                        stripped += colored[i];
                        break;
                    }
                    color += colored[i];
                    continue;
                }
                stripped += colored[i];
            }
            return stripped;
        }
    
        function escapeBracket(unescaped) {
            var escaped = "";
            for(i = 0; i < unescaped.length; i++) {
                if (unescaped[i] == "[") {
                    escaped += "\\[";
                    continue;
                }
                escaped += unescaped[i];
            }
            return escaped;
        }
        
        player = Vars.playerGroup.all().find(boolf(p => stripColor(p.name).match(stripColor(name))))
        if (player == 'null') {
            player = Vars.playerGroup.all().find(boolf(p => p.name.match(escapeBracket(name))));
            if (player == 'null') {
                player = Vars.playerGroup.all().find(boolf(p => stripColor(p.name).match(escapeBracket(stripColor(name)))));
                if (player == 'null') {
                    player = Vars.playerGroup.all().find(boolf(p => p.name == name));
                }
            }
        }
        return player;
    }

    if (args.length <= 1) {
        Vars.scripter.sendMessage("Specify the Player's name and the Warning message")
    } else {
        player = tryFindPlayer(args[0]);
        if (String(player) == 'null') {
            Vars.scripter.sendMessage(args[0] + " [#EC7063]was not found on the server")
        } else {
            Call.onInfoMessage(player.con, "[#EC7063]Warning[]\n\n" + args[1] + "\n\n\n\n[#F8C471]You have been warned")
            Vars.scripter.sendMessage(player.name + "[#85C1E9] has been [#EC7063]warned");
        }
    }

    delete tryFindPlayer;
};
ts[ts.currentScriptName].function();
0;
