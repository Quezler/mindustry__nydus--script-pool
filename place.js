// "/ts place block=Blocks.coreShard, team=Team.<team>"

team = ((typeof team === 'undefined') ? Vars.scripter.team : team);

Vars.scripter.tileOn().setNet(block, team, 0);
block.placed(Vars.scripter.tileOn());

Vars.scripter.sendMessage("placed a [accent]"+ String(block.name) +"[] for team [#"+ String(team.color) +"]"+ String(team) +"[]");

delete team;
" ";
