// Horrible and slow but it somewhat works kind of barely
if (!ts.removeWalls) {
    Events.run(Trigger.update, () => {
        if (ts.removeWalls == -1) return
        if (ts.removeWalls > Vars.world.height() * Vars.world.width()) {
            ts.removeWalls = -1
            return
        }

        const t = Vars.world.tiles.geti(ts.removeWalls++)
        if (t.block() instanceof StaticWall) t.setNet(Blocks.air)
    })
}
ts.removeWalls = 0