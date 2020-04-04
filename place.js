// "/ts place block=Blocks.coreShard, team=Team.<team>"

if (team === undefined) team = me().team;

me().tileOn().setNet(block, team, 0);
block.placed(me().tileOn());

"placed a [accent]"+ block.name +"[] for team [#"+ team.color +"]"+ team +"[]"

team = undefined
