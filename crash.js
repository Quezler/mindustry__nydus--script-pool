if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "crash";
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

    subject = undefined;
    if (args.length > 0) {
        subject = args[0];
    }

    if (typeof subject == 'undefined') {
        numClient = 0;
        playerGroup = Vars.playerGroup.all();
        for(i = 0; i < playerGroup.size; i++) {
            if (playerGroup.get(i) == Vars.scripter) {
                if (i == playerGroup.size - 1) {
                    break;
                }
                continue;
            }
            playerGroup.get(i).sendMessage(null);
            numClient++;
        }

        if (numClient == 0) {
            Vars.scripter.sendMessage("[#F7DC6F]There may be no on to crash")
        } else {
            Vars.scripter.sendMessage("[#F7DC6F]If you see some of [#F5B7B1]disconnects[] then you just [#F1948A]crashed[] [#F4D03F]" + numClient + " [#AF7AC5]client" + String(numClient == 1 ? "" : "s"))
        }

    } else {
        player = tryFindPlayer(subject);
        if (player == null) {
            Vars.scripter.sendMessage(subject + "[#E6B0AA] was not found")
        } else if (player == Vars.scripter) {
            Vars.scripter.sendMessage("[#F7DC6F]Are you trying to crash yourself?")
        } else {
            player.sendMessage(null);
            Vars.scripter.sendMessage("[#F7DC6F]If you see a [#F5B7B1]disconnect[] then you just [#F1948A]crashed[] their [#AF7AC5]client")
        }
    }
    delete tryFindPlayer;
};
ts[ts.currentScriptName].function();
0;
