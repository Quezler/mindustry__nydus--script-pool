// /ts player="name",server="server",port=6567
// If port is left empty default port is used


port = 6567
player = undefined
server = undefined

for (i = 0; i < args.length; i++) {
	if (typeof args[i] === 'string') {
		if (typeof player === 'undefined') {
			p = Vars.playerGroup.find(boolf(p => p.name.match(args[i])));
			player = p == null ? undefined : p;
		} else {
			server = args[i]
		}
	} else if (Number.isInteger(args[i]) port = args[i]
}

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
