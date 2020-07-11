// Usage:
//  /ts remove Blocks.<Block> Team.<team>?
//  Removes one or more of the specified blocks from the map
//  <team> is optional, defaults to all
//  <block> is also optional, defaults to all

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "remove";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    var blocks = [];
    var team = undefined;

    var BlacklistedBlocks = [
        Blocks.coreShard, Blocks.coreFoundation, Blocks.coreNucleus
    ]

    for (i = 0; i < args.length; i++) {
        if (args[i] instanceof Team) {
            team = args[i];
            args.splice(i, 1);
            i -= 1;
        }
    }

    blocks = args;
    numRemoved = 0;
    for (x = 0; x < Vars.world.width(); x++) {
        for (y = 0; y < Vars.world.height(); y++) {
            if ((blocks.includes(Vars.world.tile(x, y).block()) == true || blocks.length == 0) && BlacklistedBlocks.includes(Vars.world.tile(x, y).block()) == false) {
                if (Vars.world.tile(x, y).entity != null) {
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
    }

    if (numRemoved == 0) {
        Vars.scripter.sendMessage("[#FFAB4C]No Blocks were found" + (typeof team == 'undefined' ? "" : (" from team [#" + team.color + "]" + team)));
    } else {
        Vars.scripter.sendMessage("[#FFAB4C]Removed [#FFDC4C]" + numRemoved + " []blocks" + (typeof team == 'undefined' ? "" : (" from team [#" + team.color + "]" + team)));
    }

    delete blocks;
    delete team;
};
ts[ts.currentScriptName].function();
0;
