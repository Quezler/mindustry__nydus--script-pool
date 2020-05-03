//Sends all players on the server to the targeted server
// "/ts invade server port=6567
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "invade";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
	const state = ts[ts.currentScriptName];

	if (args.length == 0) {
		Vars.scripter.sendMessage("Specify the server")
	} else {
		server = args[0]
		port = args.length > 1 ? args[1] : 6567
		
		pg = Vars.playerGroup.all();
		
		for(i=0; i<pg.size; i++){
			Call.onConnect(pg.get(i).con, server, port);
		}
		
		Vars.scripter.sendMessage("Nobody expects the nydus inquisition!");
	}
};
ts[ts.currentScriptName].function();
0;
