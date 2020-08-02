// Usage:
//  /ts burn
//   to start the script
//  /ts burn true
//   to burn after selecting
//
//  select the same tile twice to turn of selection

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "burn";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    state.eventsRegisterted = typeof state.eventsRegisterted !== 'undefined' ? state.eventsRegisterted : (function() {
        state.players = {};
        
        // cleanup
        Events.on(EventType.PlayerLeave, cons(e => {
            delete state.players[e.player.uuid];
        }));

        // Event that will select the area
        Events.on(EventType.TapEvent, cons(e => {

            if (!e.player.isAdmin) return;

            var player = e.player;
            var tile = e.tile;

            if (typeof state.players[player.uuid] !== 'undefined') {
                if (state.players[player.uuid].lastTile !== null) {
                    if (state.players[player.uuid].lastTile === tile) {
                        delete state.players[player.uuid];

                        player.sendMessage('[#F7DC6F]Selection closed');
                        return;
                    }
                }


                if (!state.players[player.uuid].hasSelectedA) {
                    state.players[player.uuid].cornerA = {x: tile.x, y: tile.y};

                    if (state.players[player.uuid].isDone) state.players[player.uuid].hasSelectedB = false;
                    state.players[player.uuid].hasSelectedA = true;

                } else if (!state.players[player.uuid].hasSelectedB) {
                    state.players[player.uuid].cornerB = {x: tile.x, y: tile.y};

                    if (state.players[player.uuid].isDone) state.players[player.uuid].hasSelectedA = false;
                    state.players[player.uuid].hasSelectedB = true;
                }

                if ((state.players[player.uuid].hasSelectedB && state.players[player.uuid].hasSelectedA) && !state.players[player.uuid].isDone) {
                    state.players[player.uuid].isDone = true;
                    state.players[player.uuid].hasSelectedA = false;
                }

                state.players[player.uuid].lastTile = tile;
            }
        }));

        state.color = Color.valueOf("#FF9F3311");

        // Timer for updating seletion
        function updateSelections() {
            for (var i = 0; i < Vars.playerGroup.all().size; i++) {
                var p = Vars.playerGroup.all().get(i);

                if (typeof state.players[p.uuid] !== 'undefined') {
                    if (p.isAdmin && state.players[p.uuid].isDone) {
                        var x1 = state.players[p.uuid].cornerA.x;
                        var y1 = state.players[p.uuid].cornerA.y;

                        var x2 = state.players[p.uuid].cornerB.x;
                        var y2 = state.players[p.uuid].cornerB.y;

                        rect(x1, y1, x2, y2, p);
                    }
                }
            }
        }

        function rect(startX, startY, endX, endY, p) {
            var res = Vars.tilesize;

            if (endX < startX) {
                var t = startX;

                startX = endX;
                endX = t;
            }

            if (endY < startY) {
                var t = startY;

                startY = endY;
                endY = t;
            }

            startX *= res
            startY *= res

            endX *= res
            endY *= res

            for (var i = startY; i <= endY; i += res) {
                point(startX, i, p);
            }

            for (var i = startX; i <= endX; i += res) {
                point(i, endY, p);
            }

            for (var i = endY; i >= startY; i -= res) {
                point(endX, i, p);
            }

            for (var i = endX; i >= startX; i -= res) {
                point(i, startY, p);
            }
        }

        function point(x, y, p) {
            try { if (p.con !== null) Call.createLighting(p.con, 0, p.team, state.color, 0, x, y, 0, 2) } catch (e) { }
        }

        var selectionUpdateTask = java.util.TimerTask({run: updateSelections});
        var selectionUpdateTimer = java.util.Timer();

        selectionUpdateTimer.schedule(selectionUpdateTask, 0, 160);

        state.selectionUpdateTask = selectionUpdateTask;
        state.selectionUpdateTimer = selectionUpdateTimer;

        return true;
    })();


    function addPlayer(p) {
        p.sendMessage('[#F7DC6F]Select an area to burn');

        state.players[p.uuid] = {
            hasSelectedA: false,
            hasSelectedB: false,

            lastTile: null,

            isDone: false,

            cornerA: {x: 0, y: 0},
            cornerB: {x: 0, y: 0}
        }
    }

    function burn(startX, startY, endX, endY) {
        if (endX < startX) {
            var t = startX;

            startX = endX;
            endX = t;
        }

        if (endY < startY) {
            var t = startY;

            startY = endY;
            endY = t;
        }

        for (var x = startX; x <= endX; x++) {
            for (var y = startY; y <= endY; y++) {
                Fire.create(Vars.world.tile(x, y))
            }
        }
    }

    if (args.length == 0 || typeof state.players[Vars.scripter.uuid] === 'undefined') {
        addPlayer(Vars.scripter);

        return;
    }

    if (typeof args[0] === 'boolean') {
        if (!state.players[Vars.scripter.uuid].isDone) {
            Vars.scripter.sendMessage('[#E6B0AA]Select an area first');
            return;
        }

        var x1 = state.players[Vars.scripter.uuid].cornerA.x;
        var y1 = state.players[Vars.scripter.uuid].cornerA.y;

        var x2 = state.players[Vars.scripter.uuid].cornerB.x;
        var y2 = state.players[Vars.scripter.uuid].cornerB.y;

        burn(x1, y1, x2, y2);

        Vars.scripter.sendMessage("[#FFAB4C]Burning");
    }
};
ts[ts.currentScriptName].function();
0;
