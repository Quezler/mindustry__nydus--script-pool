// Usage:
//   /ts orekeeping
//   Places scrap over all the ores

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "oreKeeping";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
    
    var count = 0;

    for(var x = 0; x < Vars.world.width(); x++){
        for(var y = 0; y < Vars.world.height(); y++){
            var t = Vars.world.tile(x, y);
            if(((t.overlay() == Blocks.oreCopper || t.overlay() ==  Blocks.oreLead || 
                 t.overlay() == Blocks.oreScrap || t.overlay() == Blocks.oreTitanium || 
                 t.overlay() == Blocks.oreThorium || t.overlay() == Blocks.oreCoal) && args.length == 0) || (args.includes(t.overlay()) == true)) {

                t.setBlock(Blocks.scrapWall);
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
    
    if (count > 0) {
        for(i = 0; i < Vars.playerGroup.all().size; i++) {
            sync(Vars.playerGroup.all().get(i));
        }
    }
    
    Vars.scripter.sendMessage("[#AED6F1]Covered [#AF7FED]" + count + "[] ore" + (count == 1 ? "" : "s") + " with scrap");
    
    delete t;
    delete x;
    delete y;
    delete i;
    delete count;

};
ts[ts.currentScriptName].function();
0;
