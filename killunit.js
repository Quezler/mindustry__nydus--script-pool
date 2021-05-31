// totally original, not stolen from a better programmer
(function(){
    const args = parseArguments(argument);

    if (args.length === 0) return "specify a unit cheesehead";
    if (UnitTypes[args[0]] == null) return "invalid unit"

    Groups.unit.each(u => {
        if (u.type == UnitTypes[args[0]]) {
            u.kill() // Kill so their removal is synced
            u.remove() // Remove so they dont respawn
        }
    })

    return args[0] + " dead, probably"
})();
