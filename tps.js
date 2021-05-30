(function (){
    const args = parseArguments(argument)

    if (!ts.tps) ts.tps = { eventsRegistered: false, displays: {} }
    const state = ts.tps

    if (!state.eventsRegistered) {
        const timer = new Interval()
        Events.run(Trigger.update, () => {
            if (timer.get(60)) { // Run once a second
                const tps = Core.graphics.getFramesPerSecond()
                Groups.player.each(cons(p => {
                    if (state.displays[p.uuid()] && state.displays[p.uuid()].enabled) {
                        Call.infoPopup(p.con, 'TPS: ' + tps, 1,  Align.top, state.displays[p.uuid()].offset, 0, 0, 0) // 3 times to approximately match the background color of the item hud
                        Call.infoPopup(p.con, 'TPS: ' + tps, 1,  Align.top, state.displays[p.uuid()].offset, 0, 0, 0)
                        Call.infoPopup(p.con, 'TPS: ' + tps, 1,  Align.top, state.displays[p.uuid()].offset, 0, 0, 0)
                    }
                }))
            }
        })

        state.eventsRegistered = true
    }

    if (args.length > 0 && args[0][0] === 'd') {
        const offset = args.length > 1 ? args[1] : 0

        // running for the first time
        if (!state.displays[me.uuid()]) {
            state.displays[me.uuid()] = { enabled: true, offset: offset }
            return "[royal]Enabled TPS display" + (offset > 0 ? " with offset " + offset : "")
        }

        // offset change
        if (state.displays[me.uuid()].offset !== offset && args.length > 1) {
            state.displays[me.uuid()] = { enabled: true, offset: offset }
            return "[royal]Changed display offset to " + offset
        }

        // toggle
        state.displays[me.uuid()].enabled = !state.displays[me.uuid()].enabled
        return "[royal]" + (state.displays[me.uuid()].enabled ? "Enabled" : "Disabled") + " TPS display"
    }

    return '[royal]Server TPS: []' + Core.graphics.getFramesPerSecond()
})();
