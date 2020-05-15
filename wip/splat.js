if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "splat";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  if(args.length == 0) {
    Vars.scripter.sendMessage("[yellow] no action specified. use /ts splat 'start'|'stop'|'status'");
  } else switch(args[0]) {
    case "start":
      // Start the wall placer timer
      try{state.placer.cancel()}catch(e){} // just in case
      const task = new java.util.TimerTask() { run() {
        Vars.playerGroup.all().each(cons((p) => 
          if(p.tileOn().block() === Blocks.air) {
            p.tileOn().setNet(Blocks.copperWall, p.team, 0);
            Blocks.copperWall.placed(p.tileOn());
          }
        ));
      }};
      state.placer = new java.util.Timer("splat placer")
      state.placer.schedule(task, 0,100);
      state.running = true;
      break;
    case "stop":
      state.placer.cancel();
      state.running = false;
      break;
    case "status":
      Vars.scripter.sendMessage(state.running ? "[green]running" : "[red]stopped");
      break;
    case "help":
    default:
      Vars.scripter.sendMessage("[yellow] Usage: /ts splat 'start'|'stop'|'status'");
  }

};
ts[ts.currentScriptName].function();

