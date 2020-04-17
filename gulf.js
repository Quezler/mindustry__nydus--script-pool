for(var x = 0; x < world.width(); x++){
    for(var y = 0; y < world.height(); y++){
        var t = Vars.world.tile(x, y);
        if(t.block == Blocks.air) t.setFloor(Blocks.tar);
    }
}
