// Usage:
//  /ts createUnit UnitTypes.<unit> Team.<team>? amount?
//  Team is optional defualts to player's team. amount is also optional defualts to one.

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "createUnit";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    var UnitCap = 1000;

    var team = Vars.scripter.team;
    var unit = undefined;
    var amount = 1;
    
    for (i = 0; i < args.length; i++) { // parse them arguments
        if (args[i] instanceof Team) { 
            team = args[i];

        } else if (Number.isInteger(args[i])) { 
            amount = args[i];

        } else if (args[i] instanceof UnitType) { 
            unit = args[i];

        }
    }
    
    // Checks before spawning
    if (typeof unit == 'undefined') {
        Vars.scripter.sendMessage("[#E6B0AA]No unit specified");

    } else if (amount <= 0) {
        Vars.scripter.sendMessage("[#AED6F1]What are you trying to do?");

    } else if (amount + Vars.unitGroup.all().size > UnitCap) {
        Vars.scripter.sendMessage("[#AED6F1]If the units are made, they will hit the cap.")

    } else {
        for(i = 0; i < amount; i++) { // spawn them units
            var u = unit.create(team);
            u.set(Vars.scripter.x, Vars.scripter.y);
            u.add();
        }
    }

    // Cleanup scope
    delete u;
    delete unit;
    delete amount;
    delete team;
};
ts[ts.currentScriptName].function();
0;
