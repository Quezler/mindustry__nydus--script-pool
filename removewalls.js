removeWalls = (function (){
    let i = 0
    Vars.world.tiles.eachTile(cons(t => {
        if (t instanceof StaticWall) {
            if (i++ == 100) {
                Core.app.post(() => removeWalls()) // Do 100 per tick
            } else if (i <= 100) {
                t.setNet(Blocks.air)
            }
        }
    }))
    if (i < 100) Groups.player.each(cons(p => sync(p)))
})();