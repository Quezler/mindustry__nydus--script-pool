// ts rocks "clean? true"
// fills the map with random rocks

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "rocks";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    function sync() {
        midTile = Vars.world.tile(Math.floor(Vars.world.width()/2), Math.floor(Vars.world.height()/2));
        radius = java.lang.Integer(Math.max(Vars.world.width(), Vars.world.height())*9);
        for(i = 0; i < Vars.playerGroup.all().size; i++) {
            Vars.playerGroup.all().get(i).syncbeacons.put(midTile, radius);
        }
    }

    var rocks = [
        Blocks.rock,
        Blocks.shaleBoulder,
        Blocks.sandBoulder,
        Blocks.snowrock
    ];

    var cleanup = typeof args[0] == 'undefined' ? false : args[0]
    if (typeof cleanup != 'boolean') {
        Vars.scripter.sendMessage("[#AED6F1]Specify true or false [#ABEBC6]without[] quotes to set script to cleanup")
    } else {
        var count = 0;
        for(x = 0; x < Vars.world.width(); x++) {
            for(y = 0; y < Vars.world.height(); y++) {
                if (Vars.world.tile(x, y).block() == Blocks.air && !cleanup) {
                    Vars.world.tile(x, y).setBlock(rocks[Math.floor(Math.random() * rocks.length)]);
                    count++
                } else if (cleanup) {
                    if (Vars.world.tile(x, y).block() == rocks.find((r) => r == Vars.world.tile(x, y).block())) {
                        Vars.world.tile(x, y).setBlock(Blocks.air);
                        count++
                    }
                }
            }
        }
        sync();
        Vars.scripter.sendMessage((cleanup ? "[#F9E79F]Removed" : "[#ABEBC6]Placed") + " [#D7BDE2]" + count + " [#A9CCE3]rocks" )
    }
    delete sync;
    delete count;
    delete rocks;
    delete cleanup;
};
ts[ts.currentScriptName].function();
0;
