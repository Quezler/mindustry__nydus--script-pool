if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "gamemode";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
//how
		var gamemode = args[0]
		var hardmode = Vars.state.rules.waveSpacing / 2 //and i messed up agaain.
       if (gamemode === "attack") {
         js Vars.state.rules.attackMode = true; Vars.scripter.sendMessage("Enabled attack mode."
        }
		if (gamemode === "survival") {
            js Vars.state.rules.attackMode = false; Vars.state.rules.waveTimer = true; Vars.state.rules.pvp = false; Vars.scripter.sendMessage
        }
		
	   if (gamemode === "hardmode") {
		   js Vars.state.rules.waveSpacing = hardmode; Vars.scripter.sendMessage("enabled hardmode, have fun.");
        }
	   if (gamemode === "sandbox")
		 js Vars.state.rules.infiniteResources = true; Vars.state.rules.waveTimer = false; Vars.scripter.sendMessage("Enabled sandbox mode");
	    }
ts[ts.currentScriptName].function();