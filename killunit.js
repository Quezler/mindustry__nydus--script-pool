// totally original, not stolen from a better programmer
(function(){
    const args = parseArguments(argument);

    if (args.length === 0) return "specify a unit cheesehead";
    if (UnitTypes[args[0]] == null) return "invalid unit"

    Groups.unit.each(u => u.type === UnitTypes[args[0]] ? u.kill() : 0)
    Core.app.post (() => Groups.unit.each(u => u.type === UnitTypes[args[0]] ? u.kill() : 0)) // Delay 1 tick because otherwise sometimes things dont die

    return args[0] + " dead, probably"
})();
