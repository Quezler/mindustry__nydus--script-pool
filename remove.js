// /ts remove Blocks.<Block> ?Team=all
// Removes all blocks of the type specified from the world

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "remove";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    block = undefined;
    team = undefined;

    if (args.length == 0) {
        Vars.scripter.sendMessage("Specify a [#FFC433]block[] to [#FF9F33]remove");

    } else {
        for (i = 0; i < args.length; i++) {
            if (args[i] instanceof Team) {
                team = args[i];
            } else if (args[i] instanceof Block) {
                block = args[i]
            }
        }
        
        if (typeof block == 'undefined') {
            Vars.scripter.sendMessage("Specify a [#FFC433]block[] to [#FF9F33]remove");
        
        } else {
            numRemoved = 0;
            
			for (x = 0; x < Vars.world.width(); x++) {
				for (y = 0; y < Vars.world.height(); y++) {
					if (Vars.world.tile(x, y).block() == block) {
						if (typeof team != 'undefined' && Vars.world.tile(x, y).entity.team == team) {
							Vars.world.tile(x, y).entity.kill();
							numRemoved++;
						} else if (typeof team == 'undefined'){
							Vars.world.tile(x, y).entity.kill();
							numRemoved++;
						}
					}
				}
			}

            if (numRemoved == 0) {
                Vars.scripter.sendMessage("[#FFAB4C]No Blocks were found" + (typeof team == 'undefined' ? "" : (" from team [#" + team.color + "]" + team)));
            } else {
                Vars.scripter.sendMessage("[#FFAB4C]Removed [#FFDC4C]" + numRemoved + " []blocks" + (typeof team == 'undefined' ? "" : (" from team [#" + team.color + "]" + team)));
            }
        }
    }

    delete team;
    delete tiles;
    delete block;
};
ts[ts.currentScriptName].function();
0;
