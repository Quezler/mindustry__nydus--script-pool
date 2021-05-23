// totally original, not stolen from a better programmer
(function(){
    const args = parseArguments(argument);

    if (args.length === 0) return "specify a unit cheesehead";

    let newGamemode = args[0].length === 1 ? args[0] : args[0].slice(0, 2)
    switch (newGamemode.toLowerCase()) {
        case 'flare': 
            Groups.unit.each(u => u.type == UnitTypes.flare ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.flare ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.flare ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.flare ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.flare ? u.kill() : 0);
            return "flares dead, probably"

        case 'dagger':
            Groups.unit.each(u => u.type == UnitTypes.dagger ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.dagger ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.dagger ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.dagger ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.dagger ? u.kill() : 0);
            return "daggers dead, maybe"

        case 'nova':
            Groups.unit.each(u => u.type == UnitTypes.nova ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.nova ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.nova ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.nova ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.nova ? u.kill() : 0);
            return "novas gone, hopefully"

        case 'crawler':
            Groups.unit.each(u => u.type == UnitTypes.crawler ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.crawler ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.crawler ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.crawler ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.crawler ? u.kill() : 0);
            return "crawlers dead, made them attack lol"
    }

    return "not a unit/not implemented(yet)"
})();
