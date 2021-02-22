// Changes the gamemode to the provided one
// To get the current gamemode /ts gamemode 
// To change the gamemode /ts gamemode <survival|pvp|attack|sandbox>
// Note: only the first two (or one for pvp and attack) letters matter

(function(){
    const args = parseArguments(argument);

    if (args.length === 0) return "[#85C1E9]Current gamemode is [#A9CCE3]" + Vars.state.rules.mode().name();

    let newGamemode = args[0].length === 1 ? args[0] : args[0].slice(0, 2)
    switch (newGamemode.toLowerCase()) {
        case 'sa': 
            Vars.state.rules.infiniteResources = true;
            Vars.state.rules.attackMode = false;
            Vars.state.rules.waves = true;
            Vars.state.rules.pvp = false;
            Call.setRules(Vars.state.rules);
            return "[#85C1E9]Gamemode set to [#A9CCE3]sandbox"

        case 'su':
            Vars.state.rules.infiniteResources = false;
            Vars.state.rules.attackMode = false;
            Vars.state.rules.waves = true;
            Vars.state.rules.pvp = false;
            Call.setRules(Vars.state.rules);
            return "[#85C1E9]Gamemode set to [#A9CCE3]survival"

        case 'a':
        case 'at':
            Vars.state.rules.infiniteResources = false;
            Vars.state.rules.attackMode = true;
            Vars.state.rules.waves = false;
            Vars.state.rules.pvp = false;
            Call.setRules(Vars.state.rules);
            return "[#85C1E9]Gamemode set to [#A9CCE3]attack"

        case 'p':
        case 'pv':
            Vars.state.rules.infiniteResources = false;
            Vars.state.rules.attackMode = false;
            Vars.state.rules.waves = false;
            Vars.state.rules.pvp = true;
            Call.setRules(Vars.state.rules);
            return "[#85C1E9]Gamemode set to [#A9CCE3]pvp"
    }

    return "[#EB984E]Invalid Gamemode"
})();
