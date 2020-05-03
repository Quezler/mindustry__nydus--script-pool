for(var x = 0; x < Vars.world.width(); x++){
    for(var y = 0; y < Vars.world.height(); y++){
        var t = Vars.world.tile(x, y);
        if(t.block() == Blocks.air) t.setNet(Blocks.door, Vars.scripter.team, 0);
    }
}
Vars.state.rules.spawns.clear();
Vars.state.rules.waveSpacing = 60;
Vars.state.rules.waves = true;
Vars.state.rules.waitForWaveToEnd = false;
Vars.logic.runWave();
Call.onSetRules(Vars.state.rules);
