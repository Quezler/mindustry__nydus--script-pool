// Kills the selected player
// /ts smite "name"

if (args.length == 0) {
	Vars.scripter.sendMessage("Specify a player to smite")
} else {
	Vars.playerGroup.find(boolf(p => p.name.match(args[0]))).kill()
	Vars.scripter.sendMessage("Target smited.")
}

0;
