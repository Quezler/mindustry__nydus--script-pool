// toggle sandbox mode
Vars.state.rules.infiniteResources = !Vars.state.rules.infiniteResources
Call.onSetRules(Vars.state.rules)

"[white]Sandbox mode is now [accent]" + Vars.state.rules.infiniteResources
