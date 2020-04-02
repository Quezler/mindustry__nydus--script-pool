// "/ts place block=Blocks.coreShard"
me().tileOn().setNet(block, me().team, 0);
block.placed(me().tileOn());
"placed a [accent]"+ block.name +"[] for team [#"+ me().team.color +"]"+ me().team +"[]"
