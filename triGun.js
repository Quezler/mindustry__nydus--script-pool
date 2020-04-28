// To enable it on yourself or to disable it:
// /ts triGun
// optional args:
// /ts laserGun <player> <bullet>
// /ts laserGun me Bullets.meltdownLaser
// Sorry for stealing code from laserGun, I hope you dont mind. -Photemy
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "triGun";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  if(state.running){
    state.timer.cancel();
    state.running = false;
    Vars.scripter.sendMessage("Trigun has been disabled");
  }else{
    const bullet   = args[0] || Bullets.missileJavelin;
    const p        = args[6] || Vars.scripter;
    const accuracy = args[1] || 10;
    const team     = args[3] || p.team;
    const rotspd   = args[4] || 1;
    const reload   = args[5] || 1;
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
            rot = rot+(6*rotspd);
            if(mov<10){
               mov = mov+(0.1/reload)
            }else{
               for(i=0;i<360;i=i+120){
                  Calls.createBullet(
                     bullet,
                     team,
                     (p.x+Math.cos((i+rot)/57.3)*50),
                     (p.y+Math.sin((i+rot)/57.3)*50),
                     p.rotation+(Math.random()*accuracy)-(accuracy/2),
                     1,
                     1
                  );
               };
            };
         }else{
            for(f=0;f<360;f=f+120){
               Calls.createBullet(
                  Bullets.slagShot,
                  team,
                  (p.x+(Math.cos((f+rot)/57.3))*5*mov),
                  (p.y+(Math.sin((f+rot)/57.3))*5*mov),
                  0,
                  0,
                  0.2
                 );
             };
            if(mov>0){
               mov = mov - (0.2*reload)
            }
         };
    }};
    state.timer = new java.util.Timer("triGun")
    state.timer.schedule(state.task, 0,100);
    state.running = true;
    Vars.scripter.sendMessage(" " + p.name + " is now using Trigun. Arguments in order: bullet, accuracy, team, rotspd, reload, player.");
  }
};
ts[ts.currentScriptName].function();0;
