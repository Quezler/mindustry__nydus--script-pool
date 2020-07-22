// Usage:
//  /ts waveTimer 10

if (args.length === 0) {
    Vars.scripter.sendMessage("[#FFAB4C]Wave spacing is [#E6B0AA]" + Vars.state.rules.waveSpacing);
} else {
    Vars.state.rules.waveSpacing = args[0] * 60;
    Call.onSetRules(Vars.state.rules);

    Vars.scripter.sendMessage("[#FFAB4C]Set wave spacing to [#E6B0AA]" + Vars.state.rules.waveSpacing);
}
0;
