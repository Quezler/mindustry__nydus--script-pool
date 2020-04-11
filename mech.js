//Switches the mech of the targeted user(defaults to you)
// "/ts mech player="name" m=Mechs.<mech>"
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "mech";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];


 if ((typeof player)==='undefined'){
     player = Vars.scripter.name
 }
 if ((typeof player)==='object') {
    player = Vars.scripter.name
 }

 player= Vars.playerGroup.find(boolf(p => p.name.match(player)));

 player.mech=m ;
 player.heal();
 delete m;
 delete player;
 Vars.scripter.sendMessage("Mech changed.");
  
};
ts[ts.currentScriptName].function();
" "