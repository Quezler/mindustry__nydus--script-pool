// Horrible and slow but it somewhat works kind of barely
function removeWalls(start){
    for (let i = start; i < start + 50; i++) {
        if (i > Vars.world.height() * Vars.world.width()) {
            Groups.player.each(cons(p => sync(p)))
            break
        }

        let t = Vars.world.tiles.geti(i)
        if (t.block() instanceof StaticWall) t.setNet(Blocks.air)
        Call.sendMessage(t.block(), null, null)
    }
    if (start + 50 < Vars.world.height() * Vars.world.width()) Core.app.post(removeWalls(start + 50))
}
removeWalls(0)