// "/ts wavetimer seconds=5"
Vars.state.rules.waveSpacing = args[0] * 60;
Call.onSetRules(Vars.state.rules);
Strings.format("wave spacing will be [accent]{0}[] second(s) after the next wave.", args[0]);
