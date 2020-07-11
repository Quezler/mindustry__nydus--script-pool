// Usage:
//   /ts popup <player> <text>
//   Sends a popup to a player

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "popup";
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
        Vars.scripter.sendMessage("[#F7DC6F]The popup message is requied")
    } else {
        if (args.length == 1) {
            Call.onInfoMessage(args[0]);
            Vars.scripter.sendMessage("[#76D7C4]A popup has been sent to the entire server")
        } else {
            player = tryFindPlayer(args[0]);
            if (player == null) {
                Vars.scripter.sendMessage(args[0] + "[#F1948A] was not found")
            } else {
                Call.onInfoMessage(player.con, args[1]);
                Vars.scripter.sendMessage("[#5DADE2]A [#76D7C4]popup[] has been sent to []" + player.name)
            }
        }
    }
};
ts[ts.currentScriptName].function();
0;
