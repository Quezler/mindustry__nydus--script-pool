//Switches target players team(defaults to you)
// "/ts player ="name",t=Team.<team>
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "team";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];


 player=((typeof player === 'object') ? me().name : player);
 player=((typeof player === 'undefined') ? me().name : player);

 player= Vars.playerGroup.find(boolf(p => p.name.match(player)));

 player.team=t ;
 delete t
 delete player;
 me().sendMessage("Team changed.");
  
};
ts[ts.currentScriptName].function();
" "