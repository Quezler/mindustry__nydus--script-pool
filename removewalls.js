(function(){
    if (!ts.removeWalls) {
        Events.run(Trigger.update, () => {
            if (ts.removeWalls == -1) return
            const start = Time.millis()
            const tiles = Vars.world.height() * Vars.world.width()
            while (Time.timeSinceMillis(start) < 33.33) { // Run for 33.3 ms every tick
                if (ts.removeWalls >= tiles) {
                    ts.removeWalls = -1
                    Groups.player.each(cons(p => sync(p)))
                    return
                }

                const t = Vars.world.tiles.geti(ts.removeWalls++)
                if (t.block() instanceof StaticWall) t.setBlock(Blocks.air) // setNet created unneeded packet spam as we sync at the end either way.
            }
        })
    }
    ts.removeWalls = 0
})();
