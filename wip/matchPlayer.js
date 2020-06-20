// /ts matchPlayer "test" -> testing_online
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

        for (c = 0; c < colored.length; c++) {
            if (colored[c] == "[") {
                inColor = true;
                continue;
            } else if (colored[c] == "]") {
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
                if (c == colored.length - 1) {
                    stripped += "["
                    stripped += color;
                    stripped += colored[c];
                    break;
                }
                color += colored[c];
                continue;
            }
            stripped += colored[c];
        }
        return stripped;
    }

    function escapeBracket(unescaped) {
        var escaped = "";
        for(e = 0; e < unescaped.length; e++) {
            if (unescaped[e] == "[") {
                escaped += "\\[";
                continue;
            }
            escaped += unescaped[e];
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

player = null;
if (args.length == 0) {
    Vars.scripter.sendMessage("Specify a player")
} else {
    player = tryFindPlayer(args[0]);
    if (player == null) {
        Vars.scripter.sendMessage(args[0] + "[#F1948A] was not found");
    } else {
        Vars.scripter.sendMessage("[#AED6F1]Variable [#D7BDE2]player[] set to " + player.name);
    }
}

delete tryFindPlayer;
0;
