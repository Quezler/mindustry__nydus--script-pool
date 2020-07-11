// Usage:
//   /ts gun <player> Bullets.<bullet> <reload>
//  Changes bullet of <player> to <bullet>
//  <player> defualts to your player
//  If no bullet is specified, the bullet of <player> is reset
//  <reload> is also optional, it overrides player's mech's weapon reload
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "gun";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    state.players = typeof state.players == 'undefined' ? {} : state.players;
    if (typeof state.eventsRegistered == 'undefined') {
        function run() {
            for (p = 0; p < Vars.playerGroup.all().size; p++) {
                state.player = Vars.playerGroup.all().get(p);
                if (typeof state.players[state.player.uuid] != 'undefined') {
                    if (state.player.isShooting() && state.players[state.player.uuid].enabled && state.players[state.player.uuid].timer.get(0, state.players[state.player.uuid].reload) && !state.player.dead) {
                        Calls.createBullet(state.players[state.player.uuid].bullet, state.player.team, state.player.x, state.player.y, state.player.rotation, 1, 1);
                    }
                }
            }
        }

        var task = java.util.TimerTask({run: run});
        var timer = java.util.Timer();
        timer.schedule(task, 0, 50);

        state.task = task;
        state.timer = timer;
        
        Events.on(EventType.PlayerLeave, cons(e => {
            delete state.players[e.player.uuid];
        }));

        state.eventsRegistered = true;
    }

    function tryFindPlayer(name) {
        function escapeBracket(unescaped) {
            var escaped = "";
            for(e = 0; e < unescaped.length; e++) {
                if (unescaped[e] == "[") {
                    escaped += "\\[";
                    continue;
                }
                escaped += unescaped[e];
            }
            return escaped;
        }
    
        player = Vars.playerGroup.all().find(boolf(p => name === Strings.stripColors(p.name)));
        if (player == null) {
            player = Vars.playerGroup.all().find(boolf(p => name === escapeBracket(Strings.stripColors(p.name))))
            if (player == null) {
                player = Vars.playerGroup.all().find(boolf(p => Strings.stripColors(name) === Strings.stripColors(p.name)))
                if (player == null) {
                    player = Vars.playerGroup.all().find(boolf(p => escapeBracket(Strings.stripColors(name)) === escapeBracket(Strings.stripColors(p.name))))
                    if (player == null) {
                        player = Vars.playerGroup.all().find(boolf(p => name === p.name))
                        if (player == null) {
                            player = Vars.playerGroup.all().find(boolf(p => Strings.stripColors(p.name).match(name)))
                            if (player == null) {
                                player = Vars.playerGroup.all().find(boolf(p => escapeBracket(Strings.stripColors(p.name)).match(name)))
                                if (player == null) {
                                    player = Vars.playerGroup.all().find(boolf(p => Strings.stripColors(p.name).match(Strings.stripColors(name))))
                                    if (player == null) {
                                        player = Vars.playerGroup.all().find(boolf(p => escapeBracket(Strings.stripColors(p.name)).match(escapeBracket(Strings.stripColors(name)))))
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return player;
    }

    if (args.length == 0) {
        Vars.scripter.sendMessage("[#F7DC6F]Provide at least the bullet");

    } else {
        var player = Vars.scripter;
        var bullet = undefined;
        var reload = undefined;

        for (i = 0; i < args.length; i++) {
            if (typeof args[i] === 'string') {
                player = tryFindPlayer(args[i]);
                if (player == null) player = args[i]
            
            } else if (args[i] instanceof BulletType) {
                bullet = args[i];
            
            } else if (Number.isInteger(args[i])) {
                reload = args[i];
            }
        }

        if (typeof player === 'string') { 
            Vars.scripter.sendMessage(player + "[#F1948A] was not found");
        } else {
            if (typeof state.players[player.uuid] == 'undefined') { 
                state.players[player.uuid] = { };
                state.players[player.uuid].enabled = false;
                state.players[player.uuid].bullet = player.mech.weapon.bullet;
                state.players[player.uuid].reload = player.mech.weapon.alternate ? player.mech.weapon.reload / 2 : player.mech.weapon.reload;
                state.players[player.uuid].timer = new Interval();
            }

            if (state.players[player.uuid].enabled && (typeof bullet == 'undefined' || (bullet == state.players[player.uuid].bullet && reload == state.players[player.uuid].reload))) {
                state.players[player.uuid].enabled = false;
                state.players[player.uuid].bullet = player.mech.weapon.bullet;
                state.players[player.uuid].reload = player.mech.weapon.alternate ? player.mech.weapon.reload / 2 : player.mech.weapon.reload;

                Vars.scripter.sendMessage("[#AED6F1]Reverted [#D7BDE2]bullet[] of player [#" + player.color + "]" + player.name);
            
            } else {
                state.players[player.uuid].enabled = true;
                state.players[player.uuid].bullet = bullet;
                state.players[player.uuid].reload = typeof reload == 'undefined' ? (player.mech.weapon.alternate ? player.mech.weapon.reload / 2 : player.mech.weapon.reload) : reload;

                Vars.scripter.sendMessage("[#AED6F1]Set bullet of [#" + player.color + "]" + player.name + "[#AED6F1] to [#D7BDE2]" + bullet + (typeof reload == 'undefined' ? "" : "[] with reload speed [#D7BDE2]" + reload));
            }
        }
    }

    delete player;
    delete name;
    delete bullet;
    delete reload;
    delete tryFindPlayer;
};
ts[ts.currentScriptName].function();
0;
