// Usage:
//   /ts godMode
//    Sets your player health to (2^63)-1. Run again to turn off.

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "godMode";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
    state.enabled = typeof state.enabled === 'undefined' ? {} : state.enabled;

    if ((typeof state.enabled[Vars.scripter.uuid] !== 'undefined' || state.enabled[Vars.scripter.uuid]) && Vars.scripter.health > Vars.scripter.mech.health) {
        Vars.scripter.health = Vars.scripter.mech.health;
        delete state.enabled[Vars.scripter.uuid];

        Vars.scripter.sendMessage("[#FFAB4C]Godmode [#F7DC6F]turned [#D7BDE2]off");

    } else {
        Vars.scripter.health = Math.pow(2, 63) - 1;
        state.enabled[Vars.scripter.uuid] = true;

        Vars.scripter.sendMessage("[#FFAB4C]Godmode [#F7DC6F]turned [#D7BDE2]on");
    }
};
ts[ts.currentScriptName].function();
0;
