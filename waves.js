//Turns waves on and off
Vars.state.rules.waves = !Vars.state.rules.waves;
Call.onSetRules(Vars.state.rules);
"[white]Waves set to [accent]" + Vars.state.rules.waves;
