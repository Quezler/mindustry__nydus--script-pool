// i copied orekeeping old code don't @ me
count = 0;
for(var x = 0; x < Vars.world.width(); x++){
    for(var y = 0; y < Vars.world.height(); y++){
        var t = Vars.world.tile(x, y);
        if(t.floor() == Blocks.oreCopper || t.floor() ==  Blocks.oreLead || 
            t.floor() == Blocks.oreScrap || t.floor() == Blocks.oreTitanium || 
            t.floor() == Blocks.oreThorium) {
        if(t.overlay() == Blocks.oreCopper || t.overlay() ==  Blocks.oreLead || 
            t.overlay() == Blocks.oreScrap || t.overlay() == Blocks.oreTitanium || 
            t.overlay() == Blocks.oreThorium || t.overlay() == Blocks.oreCoal) {

            t.setBlock(Blocks.air);
            t.setOverlay(Blocks.air);
            count++;
        }
    }
}

0; 
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

Vars.scripter.sendMessage("[#AED6F1]Removed [#FFAB4C]" + count + "[] ore" + (count == 1 ? "" : "s"));

delete t;
delete x;
delete y;
delete i;
delete count;

0;