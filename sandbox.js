// toggle sandbox mode
Vars.state.rules.infiniteResources = !Vars.state.rules.infiniteResources
Call.onSetRules(Vars.state.rules)
// last object is returned to the chat?
"sandbox mode is now " + Vars.state.rules.infiniteResources
