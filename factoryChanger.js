 if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "factoryChanger";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  Vars.scripter.sendMessage("[red] Warning: This ts may cause lag to the server.")
var factory = args[0]
var mech = args[1]
var spawn = args[2]
factory.unitType = mech
if(!(spawn == null)){
  factory.maxSpawn = spawn;
}
Vars.scripter.sendMessage(Successfully changed args[0] + to + args[1] + additionally + args[2] + was changed)
0;

};
ts[ts.currentScriptName].function();