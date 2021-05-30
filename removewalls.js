// Horrible and slow but it somewhat works kind of barely
function removeWalls(){
    if (!ts.removeWalls) ts.removeWalls = 0
    for (let i = ts.removeWalls; i < ts.removeWalls + 50; i++) {
        if (i > Vars.world.height * Vars.world.width) {
            Groups.player.each(cons(p => sync(p)))
            break
        }

        let t = Vars.world.tile(i)
        if (t.block() instanceof StaticWall) t.setNet(Blocks.air)
    }
    ts.removeWalls += 50
    if (ts.removeWalls < Vars.world.height * Vars.world.width) Core.app.post(() => removeWalls())
}
(removeWalls())();