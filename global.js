// this script is not meant to be directly called using /ts
// this script is run every time the server starts up or script pool is updated

if(typeof ts === 'undefined') ts = { eventsRegistered: false, global: { } }; // for scripts that need stuff to persist accross runs

eval = function(js) {
    Vars.mods.getScripts().runConsole('try{evalOut = ' + js + '}catch(e){evalOut = e}');
    if (evalOut instanceof Error) {
        throw evalOut
    }
    return evalOut
}

// parses arguments into an array
parseArguments = function(arg) {
    function parse(val) { // eval with extra steps, i should probably get rid of this
        if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, val.length - 1);
        if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, val.length - 1);
        if (Strings.canParseFloat(val)) return parseFloat(val);
        if (Strings.canParseInt(val)) return parseInt(val);
        if (val === "Infinity") return Infinity;
        if (val === "NaN") return NaN;
        if (val === "undefined") return undefined;
        if (val === "null") return undefined;
        if (typeof this[val] !== 'undefined') return this[val];

        try {
            return eval(val);
        } catch(e) {
            return val;
        }
    }

    let inDoubleQuote = false;
    let args = [];

    let str = '';
    for(let i = 0; i < arg.length; i++) {
        let lastChar = i === 0 ? '' : arg[i - 1];
        let nextChar = i === arg.length - 1 ? '' : arg[i + 1];
        let char = arg[i];

        if (char == '"' && lastChar !== '\\') inDoubleQuote = !inDoubleQuote; // check if we managed to get inside a string

        if (lastChar === '"' && char !== ' ' && !inDoubleQuote) { // a string just ended and no space afterwards
            args.push(parse(str))
            str = '';
        }

        if (char === ' ' && !inDoubleQuote) { // reached a space and is not inside a string
            args.push(parse(str))
            str = '';
            continue
        }

        if (nextChar === '') { // end of string
            args.push(parse(str + char))
            str = '';
            continue;
        }

        str += char;
    }
    return args;
}

// tries to find a player, returns null if not found
// should work with a part of a name or regex
resolvePlayer = function(player) {
    return Groups.player.find(boolf(p => Strings.stripColors(p.name).includes(Strings.stripColors(player)) || Strings.stripColors(p.name).match(Strings.stripColors(player))))
}

// syncs rules for every player
syncRules = function() {
    Call.setRules(Vars.state.rules)
}

// force syncs a player
sync = function(player) {
    function sendWorldData(p) {
        if (typeof ByteArrayOutputStream == 'undefined') importPackage(java.io);
        if (typeof FastDeflaterOutputStream == 'undefined') importPackage(Packages.arc.util.io)
        if (typeof NetworkIO == 'undefined') importPackage(Packages.mindustry.net)

        var stream = new ByteArrayOutputStream()
        var def = new FastDeflaterOutputStream(stream)
        NetworkIO.writeWorld(p, def);

        var data = new Packets.WorldStream();
        data.stream = new ByteArrayInputStream(stream.toByteArray());

        p.con.sendStream(data);
    }

    Call.worldDataBegin(player.con);
    sendWorldData(player);
}

// :groundzero:
groundzero = ""
    + "[#0000000][#fac11b80][#fac11b][][]\n"
    + "[white][#fac11b][#fac11b80][][][]\n"
    + "[white][#0][][#fac11b][][#0][][][#fac11b][#fac11b80][][]\n"
    + "[#0][white][#fac11b][][][#fac11b][][]\n"
    + "[#0][white][#fac11b][][][#fac11b][][][#fac11b80][]\n"
    + "[#fac11b][#0][white][][white][][white][][]\n"
    + "[#fac11b80][][#0][][white][]\n"
    + "[#0][]\n"
    + "\n"
    + "\n"
    + "\n"
    + "[#fac11b80][][#fac11b80][][]\n"
    + "[#fac11b80][#fac11b][][]\n"
    + "[#fac11b80][#fac11b][][]\n"

kickpirated = function(p) {
    if (["VALVE", "IGGAMES", "Igruha.org", "tuttop", "CODEX", "FreeTP.Org"].includes(Strings.stripColors(p.name).trim())) {
        Call.kick(p.con, ""
             + "Mindustry is free on [royal]https://anuke.itch.io/mindustry[]\n"
             + "\n"
             + "Mindustry можно скачать бесплатно на [royal]https://anuke.itch.io/mindustry[]\n"
             + "\n"
             + groundzero
        )
    }
}

teamKeeper = function(player, leaving) {
    if (Vars.state.rules.mode() !== Gamemode.pvp) {
        ts.global.teams = { }
        return
    }
    var current = ts.global.teams || { }
    
    if (current[player.uuid()] && !leaving) {
        // different map
        if (current[player.uuid()].map !== Vars.state.map.name()) current[player.uuid()].team = player.team()
        // stored team is dead
        if (!current[player.uuid()].team.active()) current[player.uuid()].team = player.team()
        // stored team has all the players
        var teamPlayers = 0
        Groups.player.each(boolf(p => p.team() === current[player.uuid()].team), cons(() => teamPlayers++))
        if (teamPlayers === Groups.player.size() - 1) current[player.uuid()].team = player.team()
        // update team if its not the same
        if (current[player.uuid()].team !== player.team()) {
            player.team(current[player.uuid()].team)
            player.kill() // respawn at new core
        }
    }

    current[player.uuid()] = {
        team: player.team(),
        map: Vars.state.map.name()
    }

    ts.global.teams = current
}

waveLimit = function() {
    if (Vars.state.wave > 500 && Groups.player.size() === 0 && Groups.unit.size() > 3000) {
        Events.fire(new GameOverEvent(Team.sharded))   
    }
}

if (!ts.eventsRegistered) {
    Events.on(EventType.PlayerConnect, cons(e => kickpirated(e.player)))

    Events.on(EventType.PlayerJoin, cons(e => teamKeeper(e.player, false)))
    Events.on(EventType.PlayerLeave, cons(e => teamKeeper(e.player, true)))

    Events.on(EventType.PlayerJoin, cons(e => { // Prevent duped uuids
        if (Groups.player.contains(p => p != e.player && (p.uuid() == e.player.uuid() || p.usid() == e.player.usid()))) e.player.kick(Packets.KickReason.idInUse)
    }))
    
    Events.on(EventType.WaveEvent, () => waveLimit())

    ts.eventsRegistered = true
}

"[scarlet]This script is not meant to be run directly."
