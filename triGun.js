// optional args:
// /ts laserGun <player> <bullet>
// /ts laserGun me Bullets.meltdownLaser
// Sorry for stealing code from laserGun, I hope you dont mind. -Photemy
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "laserGun";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  if(state.running){
    state.timer.cancel();
    state.running = false;
    Vars.scripter.sendMessage("Trigun has been disabled");
  }else{
    const p        = args[0] || Vars.scripter;
    const bullet   = args[1] || Bullets.missileJavelin;
    const accuracy = args[2] || 20
    const team     = args[3] || p.team
    var   rot      = 1
    var   mov      = 0

      state.task = new java.util.TimerTask() {run(){
         if(p.isShooting()){
            for(j=0;j<360;j=j+120){
               Calls.createBullet(
                  Bullets.cryoShot,
                  team,
                  (p.x+(Math.cos((j+rot)/57.3))*5*mov),
                  (p.y+(Math.sin((j+rot)/57.3))*5*mov),
                  j,
                  0,
                  0.2
               );
            };
            rot = rot+4;
            if(mov<10){
               mov = mov+0.1
            }else{
               for(i=0;i<360;i=i+120){
                  Calls.createBullet(
                     bullet,
                     team,
                     (p.x+Math.cos((i+rot)/57.3)*50),
                     (p.y+Math.sin((i+rot)/57.3)*50),
                     p.rotation+(Math.random()*accuracy)-(accuracy/2),
                     3,
                     0.3
                  );
               };
            };
         }else{
            mov = 0
         };
    }};
    state.timer = new java.util.Timer("laserGun")
    state.timer.schedule(state.task, 0,50);
    state.running = true;
    Vars.scripter.sendMessage(" " + p.name + " is now using Trigun. Please turn it off before you leave");
  }
};
ts[ts.currentScriptName].function();0;
