// Horrible and slow but it somewhat works kind of barely
(function(){
    if (!ts.removeWalls) {
        Events.run(Trigger.update, () => {
            if (ts.removeWalls == -1) return
            const start = Time.millis()
            const tiles = Vars.world.height() * Vars.world.width()
            while (Time.timeSinceMillis(start) < 33.33) { // Will drop the tps down to 30 until finished
                if (ts.removeWalls >= tiles) {
                    ts.removeWalls = -1
                    Groups.player.each(cons(p => sync(p)))
                    return
                }

                const t = Vars.world.tiles.geti(ts.removeWalls++)
                if (t.block() instanceof StaticWall) t.setNet(Blocks.air)
            }
        })
    }
    ts.removeWalls = 0
})();