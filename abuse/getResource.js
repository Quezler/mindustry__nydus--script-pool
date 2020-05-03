// /ts getResource Items.<item> amount Team.<team>=Vars.scripter.team
// team is optional. if empty, your team is used

if (args.length == 0) {
	Vars.scripter.sendMessage("At least specify something")
} else {
	// pre defines them with defaults
	team = Vars.scripter.team
	amount = undefined
	item = undefined

	// Parses arguments
	for(i = 0; i < args.length; i++) {
		if (args[i] instanceof Item) item = args[i]
		else if (args[i] instanceof Team) team = args[i]
		else if (Number.isInteger(args[i])) amount = args[i]
	}
	
	// Checks whats missing
	if (typeof amount === 'undefined' || typeof item === 'undefined') {
		Vars.scripter.sendMessage("Specify the amount and the item")
	} else { // Does its thing of everthing is good
	team.core().items.add(item, amount);
	Vars.scripter.sendMessage("Added [accent]" + amount + "[] " + item + " to the core.");
	}	
}

delete team;
delete item;
delete amount;
0;
