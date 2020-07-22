// /ts matchPlayer "test" -> testing_online
function tryFindPlayer(name) {
    function escapeBracket(unescaped) {
        var escaped = "";
        for(var e = 0; e < unescaped.length; e++) {
            if (unescaped[e] == "[") {
                escaped += "\\[";
                continue;
            }
            escaped += unescaped[e];
        }
        return escaped;
    }

    player = Vars.playerGroup.all().find(boolf(p => name === Strings.stripColors(p.name)));
    if (player == null) {
        player = Vars.playerGroup.all().find(boolf(p => name === escapeBracket(Strings.stripColors(p.name))))
        if (player == null) {
            player = Vars.playerGroup.all().find(boolf(p => Strings.stripColors(name) === Strings.stripColors(p.name)))
            if (player == null) {
                player = Vars.playerGroup.all().find(boolf(p => escapeBracket(Strings.stripColors(name)) === escapeBracket(Strings.stripColors(p.name))))
                if (player == null) {
                    player = Vars.playerGroup.all().find(boolf(p => name === p.name))
                    if (player == null) {
                        player = Vars.playerGroup.all().find(boolf(p => Strings.stripColors(p.name).match(name)))
                        if (player == null) {
                            player = Vars.playerGroup.all().find(boolf(p => escapeBracket(Strings.stripColors(p.name)).match(name)))
                            if (player == null) {
                                player = Vars.playerGroup.all().find(boolf(p => Strings.stripColors(p.name).match(Strings.stripColors(name))))
                                if (player == null) {
                                    player = Vars.playerGroup.all().find(boolf(p => escapeBracket(Strings.stripColors(p.name)).match(escapeBracket(Strings.stripColors(name)))))
                                }
                            }
                        }
                    }
                }
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
