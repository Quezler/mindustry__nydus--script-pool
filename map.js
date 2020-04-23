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

    if (args.length == 0) {
        for (i = 0; i < mapList.size; i++) {
            Vars.scripter.sendMessage("[#82E0AA]" + String(i+1) + ":[] " + mapList.get(i).name());
        }
        Vars.scripter.sendMessage("[#85C1E9]Maps Listed [#C39BD3]" + mapList.size);
    } else {
        var newMap = args[0];
        map = mapList.find(boolf(m => m.name().match(stripColor(newMap))));
        if (map == null) {
            Vars.scripter.sendMessage(newMap + "[#F1948A] was not found")
        } else {
            players = Vars.playerGroup.all();

            for (i = 0; i < players.size; i++) {
                players.get(i).setDead(true);
            }

            Vars.logic.reset();
            Call.onWorldDataBegin();
            Vars.world.loadMap(map, map.rules());
            Vars.state.rules = Vars.world.getMap().rules();
            Vars.logic.play();

            for (i = 0; i < players.size; i++) {
                if(players.get(i).con == null) continue;
                players.get(i).reset();
                players.get(i).sendMessage("[#17A589]Do /sync to update map");
            }
        }
    }
};
ts[ts.currentScriptName].function();
0;
