// Horrible and slow but it somewhat works kind of barely
function removeWalls(){
    let i = 0
    Vars.world.tiles.eachTile(cons(t => {
        if (t.block() instanceof StaticWall) {
            if (i++ == 30) {
                Core.app.post(() => removeWalls()) // Remove 30 walls a tick
            } else if (i <= 30) {
                t.setNet(Blocks.air)
            }
        }
    }))
    if (i < 30) Groups.player.each(cons(p => sync(p)))
}
removeWalls()