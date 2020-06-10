// ts map             to list all available maps
// ts map "new map"   to change map

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "map";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    var mapList = Vars.maps.all();

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
        for(e = 0; e < unescaped.length; e++) {
            if (unescaped[e] == "[") {
                escaped += "\\[";
                continue;
            }
            escaped += unescaped[e];
        }
        return escaped;
    }

    function sendWorldData(player) {
        if (typeof ByteArrayOutputStream == 'undefined') importPackage(java.io);
        if (typeof FastDeflaterOutputStream == 'undefined') importPackage(Packages.arc.util.io)
        if (typeof NetworkIO == 'undefined') importPackage(Packages.mindustry.net)

        stream = new ByteArrayOutputStream();
        def = new FastDeflaterOutputStream(stream);
        NetworkIO.writeWorld(player, def);
        data = new Packets.WorldStream();
        data.stream = new ByteArrayInputStream(stream.toByteArray());

        player.con.sendStream(data);
    }

    if (args.length == 0) {
        for (i = 0; i < mapList.size; i++) {
            Vars.scripter.sendMessage("[#82E0AA]" + String(i+1) + ":[] " + mapList.get(i).name());
        }
        Vars.scripter.sendMessage("[#85C1E9]Maps Listed [#C39BD3]" + mapList.size);
    } else {
        var newMap = args[0];
        map = null;
        map = mapList.find(boolf(m => m.name().match(newMap)));
        if (map == null) {
            mapList.find(boolf(m => m.name().match(escapeBracket(newMap))));
            if (map == null) {
                map = mapList.find(boolf(m => m.name().match(stripColor(newMap))));
                if (map == null) {
                    map = mapList.find(boolf(m => m.name() == newMap));
                }
            }
        }

        if (map == null) {
            Vars.scripter.sendMessage(newMap + "[#F1948A] was not found")
        } else {
            players = [];
            for (i = 0; i < Vars.playerGroup.all().size; i++) {
                players.push(Vars.playerGroup.all().get(i));
                Vars.playerGroup.all().get(i).setDead(true);
            }

            let rules = Vars.state.rules;
            
            Vars.logic.reset();
            Call.onWorldDataBegin();
            Vars.world.loadMap(map);
            Vars.logic.play();
            
            Vars.state.rules = rules;

            for (i = 0; i < players.length; i++) {
                if(players[i].con == null) continue;

                players[i].reset();
                sendWorldData(players[i]);
                players[i].postSync()
            }
            Vars.scripter.sendMessage("[#85C1E9]Changed [#D7BDE2]map[] to []" + map.name());
        }
    }

    delete map;
    delete newMap;
    delete sendWorldData;
    delete stripColor;
};
ts[ts.currentScriptName].function();
0;
