// Horrible and slow but it somewhat works kind of barely
removewalls = function(start){
    for (let i = start; i < start + 3; i++) {
        if (i > Vars.world.height() * Vars.world.width()) {
            Groups.player.each(cons(p => sync(p)))
            break
        }

        let t = Vars.world.tiles.geti(i)
        if (t.block() instanceof StaticWall) t.setNet(Blocks.air)
        if (i == 2) {
            Call.sendMessage("a", null, null)
            Call.sendMessage(removewalls(start + 3), null, null)
        }
    }
}
removewalls(0)