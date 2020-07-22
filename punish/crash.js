// o_o

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "crash";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

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
            Vars.scripter.sendMessage(subject + "[#F1948A] was not found")
        } else if (player == Vars.scripter) {
            Vars.scripter.sendMessage("[#F7DC6F]Are you trying to crash yourself?")
        } else {
            player.sendMessage(null);
            Vars.scripter.sendMessage("[#F7DC6F]If you see a [#F5B7B1]disconnect[] then you just [#F1948A]crashed[] their [#AF7AC5]client")
        }
    }
};
ts[ts.currentScriptName].function();
0;
