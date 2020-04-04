// /ts player="name",server="server",port=6567
// If port is left empty default port is used
if(port === undefined) port = 6567;
Call.onConnect(Vars.playerGroup.find(boolf(p => p.name.match(player))).con, server, port);
"Player banished";
