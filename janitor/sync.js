// Usage:
//   /ts sync <player>
//  Force syncs <player>
//  defualts to all

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "sync";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    function sync(player) {
        function sendWorldData(p) {
            if (typeof ByteArrayOutputStream == 'undefined') importPackage(java.io);
            if (typeof FastDeflaterOutputStream == 'undefined') importPackage(Packages.arc.util.io)
            if (typeof NetworkIO == 'undefined') importPackage(Packages.mindustry.net)

            stream = new ByteArrayOutputStream();
            def = new FastDeflaterOutputStream(stream);
            NetworkIO.writeWorld(p, def);
            data = new Packets.WorldStream();
            data.stream = new ByteArrayInputStream(stream.toByteArray());

            p.con.sendStream(data);
        }

        Call.onWorldDataBegin(player.con);
        sendWorldData(player);
        player.postSync();
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
        players = Vars.playerGroup.all();
        for (i = 0; i < players.size; i++) {
            sync(players.get(i));
        }
        Vars.scripter.sendMessage("[#AED6F1]Synced [#D7BDE2]" + players.size + "[] player" + (players.size == 1 ? "" : "s"))
    } else {
        player = tryFindPlayer(args[0]);
        if (player == null) {
            Vars.scripter.sendMessage(args[0] + "[#F1948A] was not found")
        } else {
            sync(player);
            Vars.scripter.sendMessage("[#AED6F1]Synced[] " + player.name)
        }
    }

    delete sync;
    delete player;
    delete players;
    delete tryFindPlayer;
};
ts[ts.currentScriptName].function();
0;
