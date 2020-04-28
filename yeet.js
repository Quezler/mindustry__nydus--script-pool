// Yeets a player to a random server or to the specified one
// ts yeet "player" "server:port"?
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "yeet";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    parseServer = function(server_string) {
        ip = "minustry.nydus.app"
        port = 1337;

        if (server_string.includes(":")) {
            port = parseInt(server_string.substr(server_string.indexOf(":") + 1));
            ip = server_string.substr(0, server_string.indexOf(":"));
        } else {
            ip = server_string;
            port = 6567
        }
        return [ip, port];
    }

    getRandom = function() {
        server_list = [ 
            "mindustry.nydus.app:1337",
            "mindustry.nydus.app:6567",

            "mindustry.indielm.com:1101",
            "mindustry.indielm.com:6567",

            "mindustry.ecansol.com:6597",
            "mindustry.ecansol.com:6499",

            "mindustry.indielm.com:1101",
            
            "mindustry.ru:6567",
            "mindustry.ru:7000",

            "mindustry.io:6567",
            "mindustry.io:1000",
            "mindustry.io:2000",
            "mindustry.io:3000"
        ];
        return parseServer(server_list[Math.floor(Math.random() * server_list.length)]);
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

    player = tryFindPlayer(args[0]);
    server = args.length > 1 ? parseServer(args[1]) : getRandom();

    if (player == null) Vars.scripter.sendMessage(String(args[0]) + "[#E6B0AA] was not found")
    else {
        // Call.onConnect(player.con, server[0], server[1]);
        Vars.scripter.sendMessage(player.name + "[#E8DAEF] got yeeted to [#A9DFBF]" + server[0] + "[]:[#F9E79F]" + server[1]);
    }

    delete tryFindPlayer;
    delete parseServer;
    delete getRandom;
    delete player;
    delete server;
    delete p;
    delete s;
};
ts[ts.currentScriptName].function();
0;
