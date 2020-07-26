// ts map             to list all available maps
// ts map "new map"   to change map

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "map";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    var mapList = Vars.maps.all();

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

    function getMapName(map) {
        return map.name()
    }

    function getMapFile(map) {
        return map.toString().split("").reverse().join("").match("vasm\..*?\/")[0].replace("/", "").split("").reverse().join("");
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
            Vars.scripter.sendMessage("[#82E0AA]" + String(i+1) + ":[#D4EFDF] " + getMapName(mapList.get(i)) + "[#D7BDE2] => [#CCD1D1]" + getMapFile(mapList.get(i)));
        }
        Vars.scripter.sendMessage("[#85C1E9]Maps Listed [#C39BD3]" + mapList.size);
    } else {
        var newMap = args[0];
        var map = null;

        if (typeof newMap === 'number') {
            if (!((newMap - 1) >= mapList.size || (newMap - 1) < 0)) {
                map = mapList.get(newMap - 1);
            }
        } else {
            map = mapList.find(boolf(m => getMapFile(m) === newMap));
            if (map === null) {
                map = mapList.find(boolf(m => getMapName(m) === newMap));
                if (map === null) {
                    map = mapList.find(boolf(m => getMapFile(m).toLowerCase() === newMap.toLowerCase()));
                    if (map === null) {
                        map = mapList.find(boolf(m => getMapName(m).toLowerCase() === newMap.toLowerCase()));
                        if (map === null) {
                            map = mapList.find(boolf(m => getMapFile(m).match(newMap)));
                            if (map === null) {
                                map = mapList.find(boolf(m => escapeBracket(getMapFile(m)).match(escapeBracket(newMap))));
                                if (map === null) {
                                    map = mapList.find(boolf(m => Strings.stripColors(getMapFile(m)).match(Strings.stripColors(newMap))));
                                    if (map === null) {
                                        map = mapList.find(boolf(m => escapeBracket(Strings.stripColors(getMapFile(m))).match(escapeBracket((Strings.stripColors(newMap))))));
                                        if (map === null) {
                                            map = mapList.find(boolf(m => getMapName(m).match(newMap)));
                                            if (map === null) {
                                                map = mapList.find(boolf(m => escapeBracket(getMapName(m)).match(escapeBracket(newMap))));
                                                if (map === null) {
                                                    map = mapList.find(boolf(m => Strings.stripColors(getMapName(m)).match(Strings.stripColors(newMap))));
                                                    if (map === null) {
                                                        map = mapList.find(boolf(m => escapeBracket(Strings.stripColors(getMapName(m))).match(escapeBracket((Strings.stripColors(newMap))))));
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (map === null) {
            if (typeof newMap === 'number') {
                if ((newMap - 1) < 0) Vars.scripter.sendMessage("[#F7DC6F]Map number cannot be smaller then [#AF7AC5]one");
                else Vars.scripter.sendMessage("[#F7DC6F]Map number must not be greater then [#AF7AC5]" + mapList.size);
            } else {
                Vars.scripter.sendMessage(newMap + "[#E6B0AA] was not found")
            }
        } else {
            players = [];
            for (i = 0; i < Vars.playerGroup.all().size; i++) {
                players.push(Vars.playerGroup.all().get(i));
                Vars.playerGroup.all().get(i).setDead(true);
            }

            var rules = Vars.state.rules;

            Vars.logic.reset();
            Call.onWorldDataBegin();

            Vars.world.loadMap(map, map.applyRules(Gamemode.survival));
            Vars.state.rules = Vars.world.getMap().applyRules(Gamemode.survival);

            Vars.logic.play();

            for (i = 0; i < players.length; i++) {
                if(players[i].con == null) continue;

                players[i].reset();
                sendWorldData(players[i]);
                players[i].postSync()
            }
            Vars.scripter.sendMessage("[#85C1E9]Changed [#D7BDE2]map[] to []" + map.name());
        }
    }
};
ts[ts.currentScriptName].function();
0;
