for(var x = 0; x < Vars.world.width(); x++){
    for(var y = 0; y < Vars.world.height(); y++){
        var t = Vars.world.tile(x, y);
        if(t.block() == Blocks.oreCopper || t.block() ==  Blocks.oreLead || 
            t.block() == Blocks.oreScrap || t.block() == Blocks.oreTitanium || 
            t.block() == Blocks.oreThorium) {
            
            t.setBlock(Blocks.air);
        }
    }
}