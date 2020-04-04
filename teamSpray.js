//Kills all untis of the targetetd team
// "/ts team=Team.<team>"
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "teamSpray";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  unitGroup=Vars.unitGroup.all();

  team=((typeof team === 'undefined') ? Team.crux : team) 

  for(i=0; i < unitGroup.size; i++) {
      u=unitGroup.get(i);
      if (u.team === team){
               u.kill();
          };
    };
  delete team;  
  me().sendMessage("Units killed.");
  
  
};
ts[ts.currentScriptName].function();
" "