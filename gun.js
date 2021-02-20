// Usage:
//   /ts gun [player] Bullets.<bullet> <reload>
//  Changes bullet of <player> to <bullet>
//  [player] defualts to your player
//  If no bullet is specified, the bullet of <player> is reset
//  <reload> is also optional, it overrides player's unit's weapon reload

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "gun";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
    const args = ts.global.parseArguments(argument);

    function update() {
        Groups.player.each(cons(p => {
            if (!p.dead() && state.players[p.uuid()] && state.players[p.uuid()].enabled) {
                var s = state.players[p.uuid()];
                if (p.unit().isShooting && s.timer.get(0, s.reload)) {
                    Call.createBullet(s.bullet, p.team(), p.x, p.y, p.unit().angleTo(p.unit().aimX, p.unit().aimY), s.bullet.damage, 1, s.bullet.lifetime);
                }
            }
        }))
    }

    if (!state.eventsRegistered) {
        state.players = {};

        Timer.schedule({run: () => update()}, 0, 50 / 1000)

        Events.on(EventType.PlayerLeave, cons(e => {
            delete state.players[e.player.uuid()];
        }));

        state.eventsRegistered = true;
    }

    if (args.length === 0) return "No bullet specified"
    var bullet, target, reload;

    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === 'number') reload = args[i];
        if (typeof args[i] === 'string') target = args[i];
        if (args[i] instanceof BulletType) bullet = args[i];
    }

    if (!target) target = me.name;
    
    var resolvedTarget = Groups.player.find(boolf(p => Strings.stripColors(p.name) === target));
    if (!resolvedTarget) {
        if (!bullet) return "[#EB984E]No bullet specified"
        return "[#EB984E]That player is no where to be found"
    }

    if (!reload) {
        if (!resolvedTarget.dead() && resolvedTarget.unit().type.weapons.size > 0) {
            reload = resolvedTarget.unit().type.weapons.get(0).reload / resolvedTarget.unit().type.weapons.size;
        } else {
            reload = 10
        }
    }

    if (state.players[resolvedTarget.uuid()]) {
        var s = state.players[resolvedTarget.uuid()];
        if (s.bullet === bullet && s.reload === reload) {
            state.players[resolvedTarget.uuid()] = s;
            s.enabled = !s.enabled;
            if (s.enabled) {
                return "[#7FB3D5]Enabled custom bullet [#76D7C4]" + s.bullet + "[] reload [#76D7C4]" + s.reload + (target !== me.name ? "[] player [#76D7C4]" + resolvedTarget.name : ""); 
            }
            return "[#7FB3D5]Disabled custom bullet" + (target !== me.name ? " for player [#76D7C4]" + resolvedTarget.name : "");; 
        }
    }

    if (!bullet) return "[#EB984E]No bullet specified"

    if (!state.players[resolvedTarget.uuid()]) {
        state.players[resolvedTarget.uuid()] = {};
        state.players[resolvedTarget.uuid()].enabled = true;
        state.players[resolvedTarget.uuid()].bullet = bullet;
        state.players[resolvedTarget.uuid()].reload = reload;
        state.players[resolvedTarget.uuid()].timer = new Interval();;
    }

    var s = state.players[resolvedTarget.uuid()];
    s.bullet = bullet;
    s.reload = reload;
    s.enabled = true;
    state.players[resolvedTarget.uuid()] = s;

    return "[#7FB3D5]Updated bullet to [#76D7C4]" + bullet + "[] reload [#76D7C4]" + reload + (target !== me.name ? "[] player [#76D7C4]" + resolvedTarget.name : "");
};
ts[ts.currentScriptName].function();
