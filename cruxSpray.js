//Kills all units belonging to Team.crux
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "cruxSpray";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  unitGroup=Vars.unitGroup.all();



  for(i=0; 1<unitGroup.size; i++) {
      u=unitGroup.get(i);
      if (u.team === Team.crux){
               u.kill();
          }


}

  }
};
ts[ts.currentScriptName].function();
