// Usage:
//  /ts bulletClear
//    Clears all the bullets
//    Intended for fixing mess of bullets created during the proccess of abose

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "bulletClear";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    if (Vars.bulletGroup.all().isEmpty()) {
        Vars.scripter.sendMessage("[#F7DC6F]No bullets found.")
    } else {
        Vars.bulletGroup.clear()
        Vars.scripter.sendMessage("[#F7DC6F]Bullets cleared.")
    }
};
ts[ts.currentScriptName].function();
0;
