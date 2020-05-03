// set up the script state
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "cryoGhost";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  if(args.length == 0){
    Vars.scripter.sendMessage("[yellow] no action specified. use /ts cryoGhost 'start'|'stop'|'status'");
  }else{
    switch(args[0]){
      case "start":
        try{state.timer.cancel()}catch(e){} // just in case
        const task = new java.util.TimerTask() {run(){
          const p = Vars.playerGroup.all().random();
          p.sendMessage("[cyan]cryoghost[orange] >[] oOOoOOoOOOooo");
          var s = 0;
          var t = 0;
          for(i=100;i-->0;){
            s = Math.random()*100 - 50;
            t = Math.random()*100 - 50;
            Calls.createBullet(
              Bullets.cryoShot,
              Team.crux,
              p.x+s, p.y+t,
              90 - (180/Math.PI) * Math.atan2(-s, -t),
              1, 5);
          }
        }};
        state.timer = new java.util.Timer("Cryo ghost")
        state.timer.schedule(task, 0,20000);
        state.running = true;
        break;
      case "stop":
        state.timer.cancel();
        state.running = false;
        break;
      case "status":
        Vars.scripter.sendMessage(state.running ? "[green]running" : "[red]stopped");
        break;
      case "help":
      default:
        Vars.scripter.sendMessage("[yellow] Usage: /ts cryoGhost action='start'|'stop'|'status'");
    }
    delete action;
  }
};
ts[ts.currentScriptName].function();
0;
