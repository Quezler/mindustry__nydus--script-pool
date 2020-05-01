for(var x = 0; x < Vars.world.width(); x++){
    for(var y = 0; y < Vars.world.height(); y++){
        var t = Vars.world.tile(x, y);
        if(t.floor() == Blocks.oreCopper || t.floor() ==  Blocks.oreLead ||
		   t.floor() ==  Blocks.oreCoal || t.floor() ==  Blocks.oreTitanium ||
		   t.floor() ==  Blocks.oreThorium || t.floor() ==  Blocks.oreScrap ||           
           t.setBlock(Blocks.copperWall);
        }
    }
}