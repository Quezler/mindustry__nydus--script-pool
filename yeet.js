// Yeets a player to a random server or to the specified one
// ts yeet p="player", s="[Optional] server:port"
// ts yeet "player" "[Optional] server:port" (for new versioin of quez merges it)
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

    
    player = Vars.playerGroup.find(boolf(pl => pl.name.match(p)));
    server = (typeof s == 'undefined') ? getRandom() : s;
    // player = Vars.playerGroup.find(boolf(p => p.name.match(args[0])));
    // server = args.length > 1 ? parseServer(args[1]) : getRandom();

    if (String(player) == 'null') Vars.scripter.sendMessage(String(p) + "[scarlet] was not found")
    else {
        Call.onConnect(player.con, server[0], server[1]);
        Vars.scripter.sendMessage(player.name + "[cyan] got yeeted to [yellow]" + server[0] + ":" + server[1]);
    }

    delete parseServer;
    delete getRandom;
    delete player;
    delete server;
    delete p;
    delete s;
};
ts[ts.currentScriptName].function();
// 0; for new version
" ";
