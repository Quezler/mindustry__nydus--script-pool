// totally original, not stolen from a better programmer
(function(){
    const args = parseArguments(argument);

    if (args.length === 0) return "specify a unit cheesehead";

    switch (args[0].toLowerCase()) {
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
    case 'mace':
            Groups.unit.each(u => u.type == UnitTypes.mace ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.mace ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.mace ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.mace ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.mace ? u.kill() : 0);
            return "fire bad"
    case 'pulsar':
            Groups.unit.each(u => u.type == UnitTypes.pulsar ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.pulsar ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.pulsar ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.pulsar ? u.kill() : 0);
            Groups.unit.each(u => u.type == UnitTypes.pulsar ? u.kill() : 0);
            return "alternative to fire also bad"
}

    return "not a unit/not implemented(yet)"
})();
