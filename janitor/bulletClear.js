//This is a simple script but seeing as bullet related shinanigans are getting more common and complex we probably need it.
//I did think about making it target a specific team but i need to figure out how to remove a single bullet cuz kill() doesn't work.
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "bulletClear";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];
    if (Vars.bulletGroup.all().isEmpty()) {
        Vars.scripter.sendMessage("No bullets found.")
    } else {
        Vars.bulletGroup.clear()
        Vars.scripter.sendMessage("Bullets cleared.")
    }
};
ts[ts.currentScriptName].function();
0;


