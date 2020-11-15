Vars.state.rules.editor = true
Call.onInfoMessage("Za Warudo, toki wo tomare!")
var task = java.util.TimerTask({run: () => {
    Vars.state.rules.editor = false
	Call.onInfoMessage("Time has started to move again.")
}});
var timer = java.util.Timer();
timer.schedule(task, 6);
// what the hell am i doing