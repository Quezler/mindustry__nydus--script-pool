// ts sync   syncs all players
// ts sync "name" syncs the player "name"

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "yourScriptName";
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
    
    if (args.length == 0) {
        players = Vars.playerGroup.all();
        for (i = 0; i < players.size; i++) {
            sync(players.get(i));
        }
        Vars.scripter.sendMessage("[#AED6F1]Synced [#D7BDE2]" + players.size + "[] player" + (players.size == 1 ? "" : "s"))
    } else {
        player = tryFindPlayer(args[0]);
        if (player == null) {
            Vars.scripter.sendMessage(args[0] + " [#F1948A]was not found")
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
