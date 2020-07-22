// Usage:
//   /ts getResource Items.<item> amount Team.<team>?
//   Team is optional, defualts to your team

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "getResource";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  	const state = ts[ts.currentScriptName];

	if (args.length == 0) {
		Vars.scripter.sendMessage("[#E6B0AA]An item and an amount is required");

	} else {
		// pre defines them with defaults
		var team = Vars.scripter.team;
		var amount = undefined;
		var item = undefined;

		// Parses arguments
		for(var i = 0; i < args.length; i++) {
			if (args[i] instanceof Item) item = args[i];
			else if (args[i] instanceof Team) team = args[i];
			else if (Number.isInteger(args[i])) amount = args[i];
		}

		// Checks whats missing
		if (typeof amount === 'undefined' || typeof item === 'undefined') {
			Vars.scripter.sendMessage("[#E6B0AA]Specify the amount and the item");

		} else { // Does its thing of everthing is good
			team.core().items.add(item, amount);
			Vars.scripter.sendMessage("[#AED6F1]Added [#D7BDE2]" + amount + " [#F7DC6F]" + item + "[#AED6F1] to core" + (typeof team == 'undefined' ? "" : " of team [#D7BDE2]" + team));
		}
	}
};
ts[ts.currentScriptName].function();
0;
