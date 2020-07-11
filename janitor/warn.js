// Usage:
//  /ts warn <player> <warning>
//  Warns <player> for <warning>

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "warn";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    function tryFindPlayer(name) {
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
