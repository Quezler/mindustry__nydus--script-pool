// "/ts place block=Blocks.coreShard, team=Team.<team>"


team = args.length == 1 ? me().team : args[1];
block = args[0];

me().tileOn().setNet(block, team, 0);
block.placed(me().tileOn());

me().sendMessage("placed a [accent]"+ String(block.name) +"[] for team [#"+ String(team.color) +"]"+ String(team) +"[]");

delete team;
delete block;
0;
