// /ts player="name",server="server",port=6567
// If port is left empty default port is used

port = typeof args[2] === 'undefined' ? 6567 : args[2]
player = args[0]
server = args[1]

if (typeof player === 'undefined') {
	Vars.scripter.sendMessage("Either the player was not found or the name was wrong")
} else if (typeof server === 'undefined') {
	Vars.scripter.sendMessage("Specify a server")
} else {
	Call.onConnect(Vars.playerGroup.find(boolf(p => p.name.match(player))).con, server, port);
}
Vars.scripter.sendMessage("[accent]Player banished");

delete player;
delete port;
delete server;

0;
