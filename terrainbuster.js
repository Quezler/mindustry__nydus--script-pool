for(var x = 0; x < Vars.world.width(); x++){
    for(var y = 0; y < Vars.world.height(); y++){
        var t = Vars.world.tile(x, y);
        if(t.block() == Blocks.rocks, Blocks.sporerocks, Blocks.icerocks, Blocks.cliffs, Blocks.sporePine, Blocks.snowPine, Blocks.pine, Blocks.shrubs, Blocks.whiteTree, Blocks.whiteTreeDead, Blocks.sporeCluster,) t.setBlock(Blocks.air);
    }
}