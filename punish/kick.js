// This may be a useless script but whatever

// Usage: /ts kick <player?> <reason?> <duration[secs]?>
// /ts kick <unkicklast>

// Kicks all players (except scripter) with custom reason if specifed and or duration if specified
// Kicks a specfic player, with a reason if specified and or a duration if specified

// Incase of a an accidental kick[s] for a long duration
// /ts kick true;
// Will only unkick last player[s]
// and will only work if the server didnt restart (crash)
// since that kick

// Note: DO NOT ABUSE (pls)

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "kick";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    state.lastKicked = typeof state.lastKicked == 'undefined' ? [] : state.lastKicked;
    if (typeof Net == 'undefined') importPackage(Packages.mindustry.net)

    if (args[0] == true && typeof args[0] == 'boolean') {
        if (state.lastKicked.length == 0) {
            Vars.scripter.sendMessage("[#D7BDE2]Found [#E6B0AA]zero[] last kicked players :(");
            return;
        }

        for (i = 0; i < state.lastKicked.length; i++) {
            state.lastKicked[i].info.lastKicked = Time.millis();
        }

        Vars.scripter.sendMessage("[#AED6F1]Unkicked [#AF7FED]" + state.lastKicked.length + " []players");

        state.lastKicked = [];
        return;
    }

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

    var player = undefined;
    var reason = undefined;
    var duration = undefined;

    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] == 'string') {
            if (typeof player == 'undefined') {
                player = tryFindPlayer(args[i])
                if (player == null) player = undefined;
                else continue;
            }

            if (typeof reason == 'undefined') {
                if (typeof player == undefined) {
                    player = tryFindPlayer(args[i]);
                    if (player == null) {
                        reason = args[i];
                    }
                } else {
                    reason = args[i];
                }
            }
        }

        if (typeof args[i] == 'number' && typeof duration == 'undefined') {
            duration = args[i];
        }
    }

    if (typeof player == 'undefined') {
        if (Vars.playerGroup.all().size <= 1) {
            Vars.scripter.sendMessage("[#AED6F1]No players are online to kick")
        } else {
            state.lastKicked = [];
            var kicked = 0;
            for (var i = 0; i < Vars.playerGroup.all().size; i++) {
                if (Vars.playerGroup.all().get(i).con == null) continue;
                if (Vars.playerGroup.all().get(i) != Vars.scripter) {
                    if (typeof duration != 'undefined') {
                        Vars.playerGroup.all().get(i).info.lastKicked = Time.millis() + (1000 * duration);
                    }

                    if (typeof reason != 'undefined') {
                        Call.onKick(Vars.playerGroup.all().get(i).con, reason);
                    } else {
                        Vars.playerGroup.all().get(i).con.send("", Net.SendMode.tcp);
                    }

                    state.lastKicked.push(Vars.playerGroup.all().get(i));
                    kicked += 1;
                }
            }
            if (kicked != 0) Vars.scripter.sendMessage("[#AED6F1]Kicked [#E6B0AA]" + kicked + " []player" + (kicked == 1 ? "" : "s") + (typeof duration == 'undefined' ? "" : " for [#E6B0AA]" + duration + "[] seconds") + (typeof reason == 'undefined' ? " for [#D7BDE2]no reason" : ' for [#D7BDE2]"' + reason + '[#AED6F1]"'))
            else Vars.scripter.sendMessage("[#AED6F1]Could not kick the one other player for some reason,\nMaybe the other player disconnected?");
        }
    } else {
        if (player != Vars.scripter) {
            if (player.con == null) {
                Vars.scripter.sendMessage("Could not kick " + player.name + " for some reason,\nMaybe " + player.name + " disconnected?");
            } else {
                // if (player.isAdmin) player = Vars.scripter;
                
                if (typeof duration != 'undefined') {
                    player.info.lastKicked = Time.millis() + (1000 * duration);
                }

                if (typeof reason != 'undefined') {
                    Call.onKick(player.con, reason);
                } else {
                    player.con.send("", Net.SendMode.tcp);
                }
                state.lastKicked = [player];
                Vars.scripter.sendMessage("[#AED6F1]Kicked []" + player.name + "[#AED6F1]" + (typeof duration == 'undefined' ? "" : " for [#E6B0AA]" + duration + "[] seconds") + (typeof reason == 'undefined' ? " for [#D7BDE2]no reason" : ' for "[#D7BDE2]' + reason + '[#AED6F1]"'))
            }
        } else {
            Vars.scripter.sendMessage("[#AED6F1]Are you trying to kick yourself?")
        }
    }
};
ts[ts.currentScriptName].function();
0;
