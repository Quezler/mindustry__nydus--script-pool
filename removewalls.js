removeWalls = (function (){
    let i = 0
    Vars.world.tiles.eachTile(t => {
        if (!t instanceof StaticWall) continue
        if (i++ >= 100) {
            Core.app.post(() => removeWalls()) // Do 100 per tick
            break
        }
        t.setNet(Blocks.air)
    })
})();