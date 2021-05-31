// Horrible and slow but it somewhat works kind of barely
(function(){
    Timer.schedule(() => {
        Vars.world.tiles.eachTile(t => {
            if (t.block() instanceof StaticWall) t.setBlock(Blocks.air)
        })
        Groups.player.each(p => sync(p))
    }, 0.5)
})();
