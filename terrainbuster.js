for(var x = 0; x < Vars.world.width(); x++){
    for(var y = 0; y < Vars.world.height(); y++){
        var t = Vars.world.tile(x, y);
        if(t.block() == Blocks.rocks || t.block() ==  Blocks.sporerocks || 
            t.block() == Blocks.icerocks || t.block() == Blocks.cliffs || 
            t.block() == Blocks.sporePine || t.block() == Blocks.snowPine || 
            t.block() == Blocks.pine || t.block() == Blocks.shrubs ||
            t.block() == Blocks.whiteTree || t.block() == Blocks.whiteTreeDead ||
        t.block() == Blocks.sporeCluster) {
            
            t.setBlock(Blocks.air);
        }
    }
}