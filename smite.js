//Kills the selected player
// /ts smite player="name" 
Vars.playerGroup.find(boolf(p => p.name.match(player))).kill();
"Target smited.";
