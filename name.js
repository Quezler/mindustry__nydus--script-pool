//changes the name of the targeted player(defaults to you)
// "/ts name p="player" n="new name" "
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "name";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

 if ((typeof p)==='undefined') {
 p=me().name;    
 }
 Vars.playerGroup.find(boolf(p => p.name.match(p))).name=n;
 delete p;
 delete n;
 me().sendMessage("Name changed.")
  
};
ts[ts.currentScriptName].function();