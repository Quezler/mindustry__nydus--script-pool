// toggle sandbox mode
Vars.state.rules.infiniteResources = !Vars.state.rules.infiniteResources;
Call.onSetRules(Vars.state.rules);

"[#FFAB4C]Sandbox mode is now [#E6B0AA]" + Vars.state.rules.infiniteResources;
