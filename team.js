//Switches target players team(defaults to you)
// "/ts player ="name",team=Team.<team>
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "team";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];


 player=((typeof player === 'undefined') ? me() : player);

 player= Vars.playerGroup.find(boolf(p => p.name.match(player)));

 player.team=team ;
 delete team;
 delete player;
 me().sendMessage("Team changed.");
  
};
ts[ts.currentScriptName].function();
" "