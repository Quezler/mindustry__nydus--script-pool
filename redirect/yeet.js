// Usage:
//  /ts yeet
//  to yeet everyone to a random server
//
//  /ts yeet "server:port"
//  to yeet everyone to server:port
//
//  /ts yeet "server:port" "player"
//  to yeet "player" to "server:port"
//
//  /ts yeet "" "player"
//  to yeet player to random server

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "yeet";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    function parseServer(server_string) {
        var ip
        var port;

        if (server_string.includes(":")) {
            port = parseInt(server_string.substr(server_string.indexOf(":") + 1));
            ip = server_string.substr(0, server_string.indexOf(":"));
        } else {
            ip = server_string;
            port = 6567
        }
        return { ip: ip, port: port };
    }

    function getRandom() {
        server_list = [
            "mindustry.us.to",
            "mindustry.indielm.com:1101",
            "mindustry.indielm.com",
            "mindustry.nydus.app:1337",
            "mindustry.ecansol.com:6597",
            "mindustry.ecansol.com:6499",
            "mindustry.ecansol.com:6599",
            "mindustry.ru",
            "mindustry.ru:7000",
            "mindustry.io",
            "mindustry.io:1000",
            "mindustry.io:2000",
            "mindustry.io:3000",
            "aamindustry.play.ai",
            "mindustry.atannergaming.com",
            "mindustry.atannergaming.com:7000",
            "mindustry.atannergaming.com:8000",
            "mindustry.atannergaming.com:6800",
            "mindustry.kbni.net.au:6567",
            "mindustry.kbni.net.au:6568",
            "twsmindustry.24x7.hk",
            "Chaotic-Neutral.ddns.net:1111"
        ];
        return parseServer(server_list[Math.floor(Math.random() * server_list.length)]);
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

    if (args.length == 0) {
        for (var i = 0; i < Vars.playerGroup.size(); i++) {
            if (Vars.playerGroup.all().get(i).con == null || Vars.playerGroup.all().get(i) == Vars.scripter) continue;
            var s = getRandom(); var p = Vars.playerGroup.all().get(i);

            Call.onConnect(p.con, s.ip, s.port);

            Vars.scripter.sendMessage("[#F7DC6F]Yeeted [#" + p.color + "]" + p.name + "[#F7DC6F] to [#FFAB4C]" + s.ip + "[]:[#E6B0AA]" + s.port);
        }
        return;
    }

    var server;
    var player;

    if (args.length == 1) {
        server = parseServer(args[0]);
    }

    if (args.length >= 2) {
        server = args[0];
        player = args[1];
    }

    if (typeof player === 'undefined') {
        for (var i = 0; i < Vars.playerGroup.size(); i++) {
            // if (Vars.playerGroup.all().get(i).con == null || Vars.playerGroup.all().get(i) == Vars.scripter) continue;
            var p = Vars.playerGroup.all().get(i);

            // Call.onConnect(p.con, server.ip, server.port);

            Vars.scripter.sendMessage("[#F7DC6F]Yeeted [#" + p.color + "]" + p.name + "[#F7DC6F] to [#FFAB4C]" + server.ip + "[]:[#E6B0AA]" + server.port);
        }
        return;
    }

    var p = tryFindPlayer(player);
    if (p == null) {
        Vars.scripter.sendMessage(p + "[#F1948A] was not found");
        return;
    }

    if (server.ip === "") server = getRandom();
    Call.onConnect(p.con, server.ip, server.port);

    Vars.scripter.sendMessage("[#F7DC6F]Yeeted [#" + p.color + "]" + p.name + "[#F7DC6F] to [#FFAB4C]" + server.ip + "[]:[#E6B0AA]" + server.port)
};
ts[ts.currentScriptName].function();
0;
