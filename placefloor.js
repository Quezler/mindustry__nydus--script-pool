function onBuild(tile){
  if (tile.block() instanceof Floor) {
    tile.setFloor(tile.block().asFloor());
    tile.setBlock(Blocks.air)
  }
}
Events.on(EventType.BlockBuildBeginEvent, cons(e => onBuild(e.tile)))