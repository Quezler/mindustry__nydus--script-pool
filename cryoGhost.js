// set up the script state
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "cryoGhost";
if(typeof ts[currentScriptName] === 'undefined') ts[currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  if(typeof action === 'undefined'){
    "[red] no action specified. use action='start'|'stop'|'status'";
  }else{
    switch(action){
      case "start":
        try{state.timer.cancel()}catch(e){} // just in case
        const task = new java.util.TimerTask() {run(){
          const p = Vars.playerGroup.all().random();
          p.sendMessage("[cyan]cryoghost[orange] >[] oOOoOOoOOOooo");
          for(i=100;i-->0;){
            const s = math.Random()*100 - 50;
            const t = math.Random()*100 - 50;
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
      case "status":
        state.running ? "[gree]running" : "[red]stopped";
      default:
        "[red] invalid action. valid actions are: 'start', 'stop', 'status'"
    }
  }
}
ts[ts.currentScriptName].function();

