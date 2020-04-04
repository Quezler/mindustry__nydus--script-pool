//Enables and disables editor mode
Vars.state.rules.editor = !Vars.state.rules.editor;
Call.onSetRules(Vars.state.rules);
"Editor toggled";