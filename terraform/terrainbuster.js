if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "terrainbuster";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
    
    function isInstanceOf(thing, classes) {
        for (var i = 0; i < classes.length; i++) {
            if (thing instanceof classes[i]) return true;
        }
        return false;
    }

    var count = 0;
    for(var x = 0; x < Vars.world.width(); x++){
        for(var y = 0; y < Vars.world.height(); y++){
            var t = Vars.world.tile(x, y);
            if(isInstanceOf(t.block(), [Floor, OverlayFloor, DoubleOverlayFloor, StaticWall, StaticTree, TreeBlock, Rock])) {
                t.setBlock(Blocks.air);
                count++;
            }
        }
    }

    function sync(player) {
        function sendWorldData(p) {
            if (typeof ByteArrayOutputStream == 'undefined') importPackage(java.io);
            if (typeof FastDeflaterOutputStream == 'undefined') importPackage(Packages.arc.util.io)
            if (typeof NetworkIO == 'undefined') importPackage(Packages.mindustry.net)

            stream = new ByteArrayOutputStream();
            def = new FastDeflaterOutputStream(stream);
            NetworkIO.writeWorld(p, def);
            data = new Packets.WorldStream();
            data.stream = new ByteArrayInputStream(stream.toByteArray());

            p.con.sendStream(data);
        }

        Call.onWorldDataBegin(player.con);
        sendWorldData(player);
        player.postSync();
    }

    for (var i = 0; i < Vars.playerGroup.all().size; i++) {
        if (Vars.playerGroup.all().get(i).con !== null && count !== 0) sync(Vars.playerGroup.all().get(i))
    }

    Vars.scripter.sendMessage('[#FFAB4C]Removed [#D7BDE2]' + count + '[] block' + (count == 1 ? "" : "s"));
};
ts[ts.currentScriptName].function();
0;
