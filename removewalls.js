// Horrible and slow but it somewhat works kind of barely
function removeWalls(start){
    Core.app.post(() => {
        for (let i = start; i < start + 3; i++) {
            if (i > Vars.world.height() * Vars.world.width()) {
                Groups.player.each(cons(p => sync(p)))
                break
            }

            let t = Vars.world.tiles.geti(i)
            if (t.block() instanceof StaticWall) t.setNet(Blocks.air)
        }
        if (start + 3 < Vars.world.height() * Vars.world.width()) Core.app.post(removeWalls(start + 3))
    })
}
removeWalls(0)