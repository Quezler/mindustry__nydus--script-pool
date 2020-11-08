if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "observe";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    if (typeof state["registered"] === 'undefined') {
        state['jsWatch'] = {};
        state['lastNameWatch'] = {};
    }

    state.jsWatch["event"] = null;
    state.jsWatch["notify"] = msg => {
        Vars.playerGroup.all().each(cons(p => {
            if(p.isAdmin && p.uuid !== state.jsWatch.event.player.uuid) {
                p.sendMessage(msg);
            }
        }));
    }

    state.jsWatch["run"] = e => {
        state.jsWatch.event = e;
        if (e.message.startsWith('/js') || e.message.startsWith('/ts')) {
            state.jsWatch.notify('[#' + e.player.color + ']' + e.player.name + '[#A9CCE3] ran [#D5F5E3]' + e.message);
        }
    }

    state.jsWatch["register"] = () => {
        Events.on(EventType.PlayerChatEvent, cons(e => state.jsWatch.run(e)));
    }

    state['lastNameWatch'] = {};

    state.lastNameWatch["event"] = null;
    state.lastNameWatch["notify"] = msg => {
        Vars.playerGroup.all().each(cons(p => {
            if(p.isAdmin) {
                p.sendMessage(msg);
            }
        }));
    }

    state.lastNameWatch["run"] = e => {
        state.lastNameWatch.event = e;
        state.lastNameWatch.notify('[#' + e.player.color + ']' + e.player.name + "[#D4E6F1]'s [#D5F5E3]last name: [white]" + e.player.info.names.get(e.player.info.names.size - 2));
    }

    state.lastNameWatch["register"] = () => {
        Events.on(EventType.PlayerJoin, cons(e => state.lastNameWatch.run(e)));
    }

    if (typeof state["registered"] === 'undefined') {
        state.jsWatch.register();
        state.lastNameWatch.register();

        state["registered"] = true;

        Vars.scripter.sendMessage("[#85C1E9]Observing[#AED6F1] has begun");
    }
};
ts[ts.currentScriptName].function();
0;
