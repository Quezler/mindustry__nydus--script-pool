(function (){
    if (!ts.tps) ts.tps = { eventsRegistered: false }
    if (!ts.tps.eventsRegistered) {
        const timer = new Interval()
        var lastTick = 0
        ts.mean = new WindowedMean(60)

        Events.run(Trigger.update, () => {
            ts.mean.add(Time.timeSinceMillis(lastTick))
            lastTick = Time.millis()
        })

        ts.tps.eventsRegistered = true
    }

    return '[royal]Server TPS: []' + Mathf.round(1000 / ts.mean.rawMean())
})();
