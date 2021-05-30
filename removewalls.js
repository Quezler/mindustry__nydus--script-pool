// Horrible and slow but it somewhat works kind of barely
(function removeWalls(start = 0){
    for (let i = start; i < start + 50; i++) {
        if (i > Vars.world.height * Vars.world.width) {
            Groups.player.each(cons(p => sync(p)))
            break
        }

        let t = Vars.world.tile(i)
        if (t.block() instanceof StaticWall) t.setNet(Blocks.air)
    }
    if (start + 50 < Vars.world.height * Vars.world.width) Core.app.post(() => removeWalls())
    start += 50
})();