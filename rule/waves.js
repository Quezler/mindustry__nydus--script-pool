// Turns waves on and off
Vars.state.rules.waves = !Vars.state.rules.waves;
Call.onSetRules(Vars.state.rules);

"[#FFAB4C]Waves set to [#E6B0AA]" + Vars.state.rules.waves;
