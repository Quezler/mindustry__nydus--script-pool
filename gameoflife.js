for(var x = 0; x < Vars.world.width(); x++){
    for(var y = 0; y < Vars.world.height(); y++){
        var t = Vars.world.tile(x, y);
        if(t.block() == Blocks.air) t.setNet(Blocks.door, Vars.scripter.team, 0);
    }
}