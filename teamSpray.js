//Kills all untis of the targetetd team
// "/ts team=Team.<team>"
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "cruxSpray";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  unitGroup=Vars.unitGroup.all();



  for(i=0; i < unitGroup.size; i++) {
      u=unitGroup.get(i);
      if (u.team === team){
               u.kill();
          }
    }
  "Units killed."
  delete team 
};
ts[ts.currentScriptName].function();