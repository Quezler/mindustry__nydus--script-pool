// "/ts place block=Blocks.coreShard, team=Team.<team>"

team = args.length > 1 ? args[1] : Vars.scripter.team
block = args[0]

Vars.scripter.tileOn().setNet(block, team, 0);
block.placed(Vars.scripter.tileOn())

Vars.scripter.sendMessage("placed a [accent]"+ String(block.name) +"[] for team [#"+ String(team.color) +"]"+ String(team) +"[]");

delete team;
0;
