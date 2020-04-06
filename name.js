//changes the name of the targeted player(defaults to you)
// "/ts name pl="player" n="new name" "
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "name";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

 if ((typeof pl)==='undefined') {
 pl=me().name;    
 }
 if ((typeof pl)==='object') {
 pl=me().name    
 }
 Vars.playerGroup.find(boolf(p => p.name.match(pl))).name=n;
 delete pl;
 delete n;
 me().sendMessage("Name changed.")
  
};
ts[ts.currentScriptName].function();