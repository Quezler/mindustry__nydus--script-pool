// /ts pardon "uuid"
// (just the string. the rest is adjusted automatically)
// with the name of your script:
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "pardon";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
       var uuid = args[0]
        pardon uuid
};
ts[ts.currentScriptName].function();