// To enable it on yourself or to disable it:
// /ts laserGun
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "laserGun";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  if(state.running){
    state.timer.cancel();
    state.running = false;
    Vars.scripter.sendMessage("Laser Gun disabled");
  }else{
    const bullet = Bullets.lancerLaser;
    const p = Vars.scripter;
    const team = p.team;

    state.task = new java.util.TimerTask() {run(){
      if(p.isShooting)
        Calls.createBullet(bullet, team, p.x, p.y, p.baseRotation + (r()-0.5)*30, 500, 7);
    }};
    state.timer = new java.util.Timer("laserGun")
    state.timer.schedule(state.task, 0,50);
    state.running = true;
    Vars.scripter.sendMessage("Laser Gun enabled on player " + p.name + ", remember to turn it off when leaving");
  }
};
ts[ts.currentScriptName].function();
