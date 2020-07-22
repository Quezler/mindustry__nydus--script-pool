// ts light <hex color> <transparency/alpha value between 0 and 1>
// Changes the map's light to a hex color

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "light";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    function isValidHexColor(color) {
        return /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{8}$)/.test(color);
    }

    if (!Vars.state.rules.lighting) Vars.state.rules.lighting = true;

    if (args.length == 0 || !isValidHexColor(args[0])) {
        Vars.scripter.sendMessage("Specify a valid hex color");
        return;
    }

    Vars.state.rules.ambientLight = Color.valueOf(args[0]);
    if (typeof args[1] != 'undefined') Vars.state.rules.ambientLight.a = args[1];

    Call.onSetRules(Vars.state.rules);

    Vars.scripter.sendMessage("[#AED6F1]Changed map's [#AF7AC5]light color[] to this [" + args[0] + "]color" + (typeof args[1] == undefined ? "" : "[] with alpha value [#AF7FED]" + args[1]))
};
ts[ts.currentScriptName].function();
0;
