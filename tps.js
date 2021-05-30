(function (){
    if (!ts.tps) ts.tps = { eventsRegistered: false, players: {} }
    if (!ts.tps.eventsRegistered) {
        ts.tps.eventsRegistered = true
        const timer = new Interval()

        Events.run(Trigger.update, () => {
            if (timer.get(60)) { // 1s
                for (const [player, padding] of Object.entries(ts.tps.players)) {
                    Call.infoPopup(player.con, '[royal]Server TPS: []' + Core.graphics.getFramesPerSecond(), 1, Align.top, padding, 0, 0, 0)
                }
            }
        })
    }

    const args = parseArguments(argument)
    if (args.length == 0) {
        if (ts.tps.players.hasOwnProperty(me)) delete ts.tps.players[me]
        return '[royal]Server TPS: []' + Core.graphics.getFramesPerSecond()
    } else {
        ts.tps.players[me] = args[0]
        return '[royal]set TPS offset to ' + args[0]
    }
})();
